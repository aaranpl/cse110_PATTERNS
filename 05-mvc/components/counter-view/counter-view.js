import { template } from './counter-view-template.js';
import { styles } from './counter-view-styles.js';

/**
 * @class CounterView
 * @extends HTMLElement
 * @description Renders a numeric counter and three action buttons.
 *
 * The View knows nothing about the Model. All it does is:
 *   1. Reflect the `value` attribute in the display whenever it changes.
 *   2. Dispatch an `intent` CustomEvent when a button is clicked, carrying
 *      { action: 'increment' | 'decrement' | 'reset' } in event.detail.
 *
 * The Controller (not the View) subscribes to `intent` events and decides
 * how to update the Model.
 */
class CounterView extends HTMLElement {
  static get observedAttributes() { return ['value']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Wire the delegated click handler in the constructor (runs once)
    // rather than connectedCallback (which fires on every reconnect).
    this.shadowRoot.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (!action) return;
      this.dispatchEvent(new CustomEvent('intent', {
        bubbles: true,
        composed: true,
        detail: { action }
      }));
    });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value' && oldValue !== newValue) this.render();
  }

  render() {
    const value = this.getAttribute('value') ?? '0';
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template(value)}`;
  }
}

customElements.define('counter-view', CounterView);
