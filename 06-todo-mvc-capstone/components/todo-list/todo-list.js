import { template } from './todo-list-template.js';
import { styles } from './todo-list-styles.js';

/**
 * @class TodoList
 * @extends HTMLElement
 * @description Renders the list of todos and routes toggle/remove actions
 * via a single delegated click listener.
 *
 * Lesson 02 callback: instead of attaching a separate click listener to every
 * checkbox and every remove button, we attach EXACTLY ONE listener to the
 * shadow root and let click events bubble up to it. We identify the intended
 * action from event.target.dataset.action and the item from
 * event.target.dataset.id. Adding, removing, or toggling 100 todos still
 * requires only this one listener — that's the event-delegation payoff.
 *
 * The listener is attached in the constructor (runs once) not in
 * connectedCallback (which runs on every re-insertion into the DOM).
 */
class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._todos = [];

    // ONE delegated handler for both toggle and remove — lesson 02 pattern.
    // Attached in the constructor so re-attachment to the DOM never duplicates
    // it (same rationale as lesson 05's CounterView).
    this.shadowRoot.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      const id = Number(e.target.dataset.id);
      if (!action || !id) return;
      this.dispatchEvent(new CustomEvent('intent', {
        bubbles: true,
        composed: true,
        detail: { action, id }
      }));
    });
  }

  set todos(arr) {
    this._todos = Array.isArray(arr) ? arr : [];
    this.render();
  }

  get todos() { return this._todos; }

  connectedCallback() {
    this.render();
  }

  // Note: this replaces the entire list innerHTML on every change. That
  // means clicking a checkbox destroys the checkbox you just clicked,
  // and the browser moves focus to <body>. For a teaching demo this is
  // acceptable. In production you'd reconcile the list (keyed diffing,
  // MutationObserver, or a library like Lit) to preserve focus.
  render() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template(this._todos)}`;
  }
}

customElements.define('todo-list', TodoList);
