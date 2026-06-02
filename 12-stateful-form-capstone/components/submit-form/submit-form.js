import { template } from './submit-form-template.js';
import { styles } from './submit-form-styles.js';
import { next } from '../../scripts/machine.js';

// Realistic-looking error messages, picked at random when the simulated
// submit fails. Contextual messages (vs. a generic "submission failed")
// are the lesson-11 robustness habit: tell the user WHAT went wrong so
// they can decide whether retry is worth attempting.
const SIMULATED_ERRORS = [
  'Server returned 503 Service Unavailable',
  'Server returned 500 Internal Server Error',
  'Network request failed: connection refused',
];

class SubmitForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._state = 'idle';
    this._message = '';
    this._error = '';
    this._lastSubmitted = '';

    // Delegated submit handler — captures input, transitions to submitting,
    // and kicks off the async submit. We don't `await` the submit here
    // because the event handler itself is synchronous; _submit() owns its
    // own try/catch so errors don't escape into an unhandled rejection.
    this.shadowRoot.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = this.shadowRoot.querySelector('input[name="message"]');
      this._message = input?.value.trim() ?? '';
      if (!this._message) return;
      this._lastSubmitted = this._message;
      if (this._transition('submit')) this._submit();
    });

    this.shadowRoot.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (!action) return;
      if (action === 'retry') {
        const input = this.shadowRoot.querySelector('input[name="message"]');
        const edited = input?.value.trim();
        if (edited) {
          this._message = edited;
          this._lastSubmitted = edited;
        }
        if (this._transition('retry')) this._submit();
      } else if (action === 'submit-another' || action === 'cancel') {
        // _message / _lastSubmitted / _error are cleared inside _transition
        // when we land in idle — no manual reset needed here.
        this._transition('reset');
      }
    });
  }

  connectedCallback() {
    // Build the shadow DOM ONCE with two stable regions:
    //   .form-container — replaced on every state change (full re-render)
    //   .aria-live      — persistent; only its textContent is updated
    //
    // Recreating an aria-live element on every render is unreliable across
    // screen readers (NVDA/JAWS/VoiceOver each behave differently). The
    // robust pattern is a persistent live region whose CONTENT mutates.
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="form-container"></div>
      <div class="aria-live" role="status" aria-live="polite"></div>
    `;
    this.dataset.state = this._state;
    this.render();
  }

  // Returns true when the transition actually moved state, false otherwise.
  // Callers use the return value to gate async side-effects (so we don't
  // schedule a network call for a rejected transition).
  _transition(event) {
    const newState = next(this._state, event);
    if (newState === this._state) return false;
    this._state = newState;
    this.dataset.state = newState;
    // Clear stale data when entering idle — otherwise the input would still
    // show the previously-submitted text after "Submit another" or "Cancel".
    if (newState === 'idle') {
      this._message = '';
      this._error = '';
      this._lastSubmitted = '';
    }
    this.render();
    return true;
  }

  // Async submit with try/catch — same shape as lesson 11's user-card.
  // Errors are surfaced into the UI via the state machine: catch sets the
  // error message, then 'reject' transitions us into the error state.
  async _submit() {
    try {
      await this._simulateNetwork();
      // Defensive: if state somehow moved off 'submitting' (the current
      // transition table makes this unreachable, but we don't want
      // correctness to depend on the table never growing), drop the result.
      if (this._state !== 'submitting') return;
      this._transition('resolve');
    } catch (err) {
      if (this._state !== 'submitting') return;
      this._error = err.message;
      this._transition('reject');
    }
  }

  _simulateNetwork() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve();
        } else {
          const msg = SIMULATED_ERRORS[Math.floor(Math.random() * SIMULATED_ERRORS.length)];
          reject(new Error(msg));
        }
      }, 1500);
    });
  }

  _ariaMessage() {
    return {
      idle:       '',
      submitting: 'Submitting your message…',
      success:    `Submitted successfully: ${this._lastSubmitted}`,
      error:      this._error
        ? `Submission failed: ${this._error}. You can retry or cancel.`
        : 'Submission failed. You can retry or cancel.',
    }[this._state] ?? '';
  }

  // NOTE: render() replaces the form-container's entire HTML on every state
  // change. Keyboard focus on a button inside that container is lost when
  // the button is re-created — fine for a teaching demo, but a production
  // form would do targeted updates (or use a vdom library) to preserve focus.
  render() {
    const form = this.shadowRoot.querySelector('.form-container');
    if (!form) return; // shadow root not built yet (called before connectedCallback)
    form.innerHTML = template({
      state: this._state,
      message: this._message,
      error: this._error,
      lastSubmitted: this._lastSubmitted,
    });
    this.shadowRoot.querySelector('.aria-live').textContent = this._ariaMessage();
  }
}

customElements.define('submit-form', SubmitForm);
