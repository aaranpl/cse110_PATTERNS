import { template } from './status-publisher-template.js';
import { styles } from './status-publisher-styles.js';

/** Default messages for each level when the user leaves the text input empty. */
const DEFAULT_MESSAGES = {
  info: 'All systems operational.',
  warn: 'Elevated response times detected.',
  error: 'Service unavailable — check logs.',
};

/**
 * @class StatusPublisher
 * @extends HTMLElement
 * @description Renders a small form (level selector + optional message) and
 *   dispatches a `notify` CustomEvent when the user clicks "Send notification".
 *
 * @attr {string} source - Identifies this publisher (e.g. "server-a").
 *   The value is forwarded verbatim in event.detail.source.
 *
 * @fires notify - Bubbles and escapes Shadow DOM (composed: true).
 *   detail: { source: string, level: 'info'|'warn'|'error', message: string, timestamp: number }
 */
class StatusPublisher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get source() {
    return this.getAttribute('source') || 'unknown';
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template(this.source)}`;

    this.shadowRoot.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'send') this.sendNotification();
    });
  }

  sendNotification() {
    const level = this.shadowRoot.querySelector('select[name="level"]').value;
    const raw   = this.shadowRoot.querySelector('input[name="message"]').value.trim();
    const message = raw || DEFAULT_MESSAGES[level];

    this.dispatchEvent(new CustomEvent('notify', {
      bubbles: true,
      composed: true,
      detail: {
        source: this.source,
        level,
        message,
        timestamp: Date.now(),
      },
    }));
  }
}

customElements.define('status-publisher', StatusPublisher);
