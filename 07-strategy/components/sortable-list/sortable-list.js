import { template } from './sortable-list-template.js';
import { styles } from './sortable-list-styles.js';
import { strategies, strategyLabels } from '../../scripts/strategies.js';

/**
 * @class SortableList
 * @extends HTMLElement
 *
 * Renders a sorted list of { name, createdAt } items.
 * The sort order is determined by the `strategy` attribute, which must
 * match one of the keys exported by strategies.js.
 *
 * The component owns NO sort logic. It receives a strategy name via an
 * attribute, looks up the corresponding comparator from strategies.js,
 * and passes it to Array.sort(). The component knows HOW to sort; the
 * strategy knows how to COMPARE — and the uniform (a, b) => number
 * signature is what makes them swappable.
 *
 * Usage:
 *   <sortable-list strategy="byNameAsc"></sortable-list>
 *   list.items = [{ name: 'Apple', createdAt: 1234567890 }, ...]
 */
class SortableList extends HTMLElement {
  static get observedAttributes() { return ['strategy']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._items = [];

    // Delegated change handler attached in the constructor (runs once),
    // not connectedCallback (which fires on every reconnect).
    this.shadowRoot.addEventListener('change', (e) => {
      if (e.target.dataset.role === 'strategy-select') {
        this.setAttribute('strategy', e.target.value);
      }
    });
  }

  // --- items property ---

  set items(arr) {
    this._items = arr;
    this.render();
  }

  get items() {
    return [...this._items];
  }

  // --- strategy getter (reads attribute) ---

  get strategy() {
    return this.getAttribute('strategy') ?? 'byNameAsc';
  }

  // --- lifecycle ---

  connectedCallback() {
    if (!this.hasAttribute('strategy')) this.setAttribute('strategy', 'byNameAsc');
    this.render();
  }

  attributeChangedCallback(name) {
    if (name === 'strategy' && this.isConnected) this.render();
  }

  // --- helpers ---

  sortedItems() {
    const strategyFn = strategies[this.strategy] ?? strategies.byNameAsc;
    return [...this._items].sort(strategyFn);
  }

  render() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template({
      strategy: this.strategy,
      labels: strategyLabels,
      items: this.sortedItems(),
    })}`;
  }
}

customElements.define('sortable-list', SortableList);
