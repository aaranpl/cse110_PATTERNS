import { template } from './fetch-view-template.js';
import { styles } from './fetch-view-styles.js';
import { next } from '../../scripts/machine.js';

class FetchView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._state = 'idle';
    this._data  = null;
    this._error = null;

    // Delegated click listener attached in constructor
    this.shadowRoot.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (!action) return;
      this.dispatch(action);
    });
  }

  connectedCallback() {
    this.dataset.state = this._state;
    this.render();
  }

  /**
   * Translate a UI-level intent into one or more machine events.
   * 'fetchOk' and 'fetchFail' are not machine events themselves —
   * they trigger a 'fetch' transition, then an async outcome.
   *
   * Async side-effects only run when the synchronous transition was
   * accepted by the state machine — otherwise we'd queue work that
   * has no business being scheduled (e.g. a keyboard-activated
   * "fetchOk" press while already loading).
   */
  dispatch(event) {
    if (event === 'fetchOk') {
      if (this._transition('fetch')) this._simulateFetch(true);
    } else if (event === 'fetchFail') {
      if (this._transition('fetch')) this._simulateFetch(false);
    } else if (event === 'retry') {
      if (this._transition('retry')) this._simulateFetch(Math.random() > 0.5);
    } else {
      this._transition(event); // reset
    }
  }

  // Returns true if the transition actually moved state, false otherwise.
  _transition(event) {
    const newState = next(this._state, event);
    if (newState === this._state) return false; // invalid transition already warned by next()
    this._state = newState;
    this.dataset.state = newState;
    if (newState === 'idle') {
      this._data = null;
      this._error = null;
    }
    this.render();
    return true;
  }

  // Side note: if the host element is removed mid-fetch this setTimeout
  // still fires and mutates a detached shadow root. Fine for a teaching
  // demo; production code would track the timer and clear it in
  // disconnectedCallback (see Lesson 11 — Robustness).
  _simulateFetch(succeeds) {
    setTimeout(() => {
      // Defensive: protects against future transitions that might leave
      // 'loading' before this callback fires. The current transition
      // table can't actually produce that, but we don't want correctness
      // to depend on the table never growing.
      if (this._state !== 'loading') return;
      if (succeeds) {
        this._data  = { value: 'Hello from the fetch!' };
        this._error = null;
        this._transition('resolve');
      } else {
        this._error = 'Simulated network error';
        this._data  = null;
        this._transition('reject');
      }
    }, 800);
  }

  // Full shadow-DOM replacement on every state change. Simple and correct
  // for a teaching demo, but a production component would use targeted
  // updates to preserve focus (e.g., keyboard focus on a button is lost
  // when that button is re-created).
  render() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template({
      state: this._state,
      data:  this._data,
      error: this._error,
    })}`;
  }
}

customElements.define('fetch-view', FetchView);
