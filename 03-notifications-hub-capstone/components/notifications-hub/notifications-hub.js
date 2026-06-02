import { template, stacksHTML } from './notifications-hub-template.js';
import { styles } from './notifications-hub-styles.js';

/** Maximum notifications retained per source. */
const MAX_PER_SOURCE = 5;

/**
 * @class NotificationsHub
 * @extends HTMLElement
 * @description Hosts any number of <status-publisher> children via a <slot>.
 *   Attaches ONE delegated `notify` listener on itself; routes incoming events
 *   into per-source stacks by event.detail.source (never touches child internals).
 *
 * Combines lesson 01 (pub/sub — children fire events) and
 * lesson 02 (event delegation — a single parent listener routes by event.detail).
 */
class NotificationsHub extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    /** @type {Map<string, Array<{level:string, message:string, timestamp:number}>>} */
    this.stacks = new Map();
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template()}`;

    // Exactly ONE listener for all notify events from all child publishers.
    // Events bubble up through the slot and are caught here at the hub.
    this.addEventListener('notify', this.handleNotify.bind(this));

    // Delegated click handler for hub-level controls (e.g. "Clear all").
    this.shadowRoot.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'clear-all') this.clearAll();
    });
  }

  /**
   * Routes an incoming `notify` event into the correct per-source stack.
   * Uses ONLY event.detail — never queries children by tag name.
   * @param {CustomEvent} event
   */
  handleNotify(event) {
    const { source, level, message, timestamp } = event.detail ?? {};
    if (!source) return; // silently drop malformed events

    if (!this.stacks.has(source)) {
      this.stacks.set(source, []);
    }

    const stack = this.stacks.get(source);
    stack.push({ level, message, timestamp });

    // Enforce max-5-per-source by dropping the oldest entry.
    if (stack.length > MAX_PER_SOURCE) {
      stack.shift();
    }

    this.renderStacks();
  }

  clearAll() {
    this.stacks.clear();
    this.renderStacks();
  }

  /**
   * Re-renders only the stacks area; the publishers slot and header are left untouched.
   * This shows that you can update a sub-region of a shadow root independently —
   * the slotted publishers below don't need to know we just re-rendered above them.
   */
  renderStacks() {
    const grid = this.shadowRoot.getElementById('stacks-grid');
    if (grid) grid.innerHTML = stacksHTML(this.stacks);
  }
}

customElements.define('notifications-hub', NotificationsHub);
