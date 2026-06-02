import { template } from './todo-input-template.js';
import { styles } from './todo-input-styles.js';

/**
 * @class TodoInput
 * @extends HTMLElement
 * @description Text input + Add button for entering new todo items.
 *
 * The View knows nothing about the Model. When the user submits the form
 * (either by clicking Add or pressing Enter), it dispatches an `intent`
 * CustomEvent with { action: 'add', text } and clears the field.
 * The Controller listens for `intent` and calls model.add(text).
 */
class TodoInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template()}`;

    // Wire the submit handler in the constructor (runs once) so re-attachment
    // to the DOM never duplicates the listener — same rationale as lesson 05.
    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = this.shadowRoot.querySelector('input');
      const text = input.value;
      if (!text.trim()) return;
      this.dispatchEvent(new CustomEvent('intent', {
        bubbles: true,
        composed: true,
        detail: { action: 'add', text }
      }));
      input.value = '';
      input.focus();
    });
  }
}

customElements.define('todo-input', TodoInput);
