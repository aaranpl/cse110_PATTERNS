const STORAGE_KEY = 'patterns:14:theme';

class PreferencesView extends HTMLElement {
  connectedCallback() {
    const current = localStorage.getItem(STORAGE_KEY) ?? 'light';
    this.innerHTML = `
      <h2>Preferences</h2>
      <p>This view lives at <code>#/prefs</code>. Try the back button — your URL goes back to <code>#/list</code>.</p>
      <label>
        Theme:
        <select data-role="theme-select">
          <option value="light"${current === 'light' ? ' selected' : ''}>Light</option>
          <option value="dark"${current === 'dark' ? ' selected' : ''}>Dark</option>
        </select>
      </label>
    `;
    this.querySelector('[data-role="theme-select"]').addEventListener('change', (e) => {
      localStorage.setItem(STORAGE_KEY, e.target.value);
      document.documentElement.dataset.theme = e.target.value;
    });
  }
}
customElements.define('preferences-view', PreferencesView);
