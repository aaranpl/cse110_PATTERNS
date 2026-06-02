import { template, entryTemplate } from './debug-log-template.js';
import { styles } from './debug-log-styles.js';

class DebugLog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template()}`;
    this.entriesList = this.shadowRoot.querySelector('.entries');
  }

  addEntry(detail) {
    const entry = {
      timestamp: Date.now(),
      source: detail.source ?? 'unknown',
      type: detail.type ?? 'log',
      message: detail.message ?? ''
    };
    this.entriesList.insertAdjacentHTML('beforeend', entryTemplate(entry));
    this.entriesList.scrollTop = this.entriesList.scrollHeight;
  }
}

customElements.define('debug-log', DebugLog);
