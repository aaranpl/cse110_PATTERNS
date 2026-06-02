import { template } from './test-bench-template.js';
import { styles } from './test-bench-styles.js';

class TestBench extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template()}`;
    this.shadowRoot.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (action === 'run') this.run();
      else if (action === 'clear') this.clear();
      else if (action === 'error') {
        // Deliberately uncaught SYNCHRONOUS throw — demonstrates the
        // 'error' global listener in scripts/main.js.
        throw new Error('Simulated synchronous runtime error');
      } else if (action === 'unhandled-rejection') {
        // Deliberately UNHANDLED rejection — no .catch(), no try/catch
        // around an await, so the rejection escapes user code and lands
        // in the 'unhandledrejection' global listener in scripts/main.js.
        Promise.reject(new Error('Simulated unhandled promise rejection'));
      }
    });
  }

  get container() { return this.querySelector('#card-container'); }

  clear() {
    if (this.container) this.container.innerHTML = '';
  }

  run() {
    this.clear();
    const scenarios = [
      { title: 'Active User', scenario: 'active' },
      { title: 'Suspended User', scenario: 'suspended' },
      { title: 'Delayed (500ms)', scenario: 'delayed:500' },
      { title: 'Delayed (1500ms)', scenario: 'delayed:1500' },
      { title: 'Delayed (3000ms)', scenario: 'delayed:3000' },
      { title: 'Error Case', scenario: 'error' },
      { title: 'Timeout Case', scenario: 'timeout' },
    ];
    for (const { title, scenario } of scenarios) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `<h3>${title}</h3><user-card scenario="${scenario}"></user-card>`;
      this.container.appendChild(wrapper);
    }
  }
}

customElements.define('test-bench', TestBench);
