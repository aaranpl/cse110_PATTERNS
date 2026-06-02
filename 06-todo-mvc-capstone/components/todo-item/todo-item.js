import { template } from './todo-item-template.js';

/**
 * <todo-item> — purely presentational. No event handlers.
 *
 * Uses LIGHT DOM (no Shadow DOM) so that clicks inside it stay
 * targeted at the actual clicked element — important because the
 * parent <todo-list> uses delegated routing by event.target.dataset.
 * If we used Shadow DOM, the browser would retarget event.target
 * to this host element when the click crosses the shadow boundary,
 * and the parent's delegation would break.
 *
 * Styling for <todo-item> children lives in the parent's stylesheet.
 */
class TodoItem extends HTMLElement {
  static get observedAttributes() { return ['todo-id', 'text', 'done']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const id = this.getAttribute('todo-id');
    const text = this.getAttribute('text') ?? '';
    const done = this.hasAttribute('done');
    this.innerHTML = template({ id, text, done });
  }
}

customElements.define('todo-item', TodoItem);
