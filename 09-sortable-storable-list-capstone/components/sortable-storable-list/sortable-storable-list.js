import { template } from './sortable-storable-list-template.js';
import { styles } from './sortable-storable-list-styles.js';
import { strategies, strategyLabels } from '../../scripts/strategies.js';
import { StorageFactory } from '../../scripts/storage.js';

/**
 * @class SortableStorableList
 * @extends HTMLElement
 *
 * Capstone component combining lesson 07 (Strategy) and lesson 08 (DI).
 *
 * Takes TWO observed attributes:
 *   - strategy: sort comparator key (byNameAsc | byNameDesc | byDateNewest | byDateOldest)
 *   - storage:  backend key (memory | localStorage)
 *
 * Either attribute can change independently at runtime. Changing strategy
 * re-sorts in place. Changing storage shows the new backend's own items
 * (switching backends does NOT migrate items between them).
 *
 * Items have shape: { id: number, name: string, createdAt: number }
 *
 * Usage:
 *   <sortable-storable-list strategy="byNameAsc" storage="memory"></sortable-storable-list>
 */
class SortableStorableList extends HTMLElement {
  static get observedAttributes() { return ['strategy', 'storage']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._items = [];
    this._storageInstance = null;

    // All delegated event listeners attached once in the constructor —
    // not in connectedCallback, which fires on every reconnect.

    // Strategy / storage dropdowns
    this.shadowRoot.addEventListener('change', (e) => {
      const role = e.target.dataset.role;
      if (role === 'strategy-select') {
        this.setAttribute('strategy', e.target.value);
      } else if (role === 'storage-select') {
        this.setAttribute('storage', e.target.value);
      }
    });

    // Add / Remove buttons
    this.shadowRoot.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (action === 'add') {
        this.handleAdd();
      } else if (action === 'remove') {
        this.removeItem(Number(e.target.dataset.id));
      }
    });

    // Enter key in the name input → Add
    this.shadowRoot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.dataset.role === 'name-input') {
        e.preventDefault();
        this.handleAdd();
      }
    });
  }

  // --- attribute getters ---

  get strategy() { return this.getAttribute('strategy') ?? 'byNameAsc'; }
  get storage()  { return this.getAttribute('storage')  ?? 'memory'; }

  // --- lifecycle ---

  connectedCallback() {
    // Set defaults so attributeChangedCallback fires for the initial values
    if (!this.hasAttribute('strategy')) this.setAttribute('strategy', 'byNameAsc');
    if (!this.hasAttribute('storage'))  this.setAttribute('storage',  'memory');
    // Initial storage setup and first render
    this.swapStorage(this.storage);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isConnected || oldValue === newValue) return;
    if (name === 'storage')  this.swapStorage(newValue);
    if (name === 'strategy') this.render();
  }

  // --- storage swap ---

  /**
   * Creates a new storage backend of the requested type and shows whatever
   * that backend currently holds. Backends are independent: switching does
   * not migrate items from the previous backend into the new one.
   */
  swapStorage(type) {
    this._storageInstance = StorageFactory.createStorage(type);
    this._items = this._storageInstance.load();
    this.render();
  }

  // --- item mutation ---

  handleAdd() {
    const input = this.shadowRoot.querySelector('[data-role="name-input"]');
    if (!input) return;
    const name = input.value.trim();
    if (!name) return;

    const now = Date.now();
    this._items.push({ id: now, name, createdAt: now });
    this._storageInstance.save(this._items);
    input.value = '';
    input.focus();
    this.render();

    this.dispatchEvent(new CustomEvent('item-added', {
      bubbles: true,
      composed: true,
      detail: { name },
    }));
  }

  removeItem(id) {
    this._items = this._items.filter(item => item.id !== id);
    this._storageInstance.save(this._items);
    this.render();

    this.dispatchEvent(new CustomEvent('item-removed', {
      bubbles: true,
      composed: true,
      detail: { id },
    }));
  }

  // --- sort ---

  sortedItems() {
    const fn = strategies[this.strategy] ?? strategies.byNameAsc;
    return [...this._items].sort(fn);
  }

  // --- render ---

  render() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template({
      strategy: this.strategy,
      storage: this.storage,
      strategyLabels,
      storageLabels: { memory: 'Memory', localStorage: 'LocalStorage' },
      items: this.sortedItems(),
    })}`;
  }
}

customElements.define('sortable-storable-list', SortableStorableList);
