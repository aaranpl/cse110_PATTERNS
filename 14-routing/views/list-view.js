const SAMPLE_ITEMS = [
  { id: 1, label: 'Pub/Sub', lesson: '01' },
  { id: 2, label: 'Event Delegation', lesson: '02' },
  { id: 3, label: 'Components', lesson: '04' },
  { id: 4, label: 'MVC', lesson: '05' },
  { id: 5, label: 'Strategy', lesson: '07' },
  { id: 6, label: 'Dependency Injection', lesson: '08' },
  { id: 7, label: 'State Machine', lesson: '10' },
  { id: 8, label: 'Routing (you are here)', lesson: '14' },
];

// Page-level views in this lesson DO NOT attach a shadow DOM, by design.
// Shadow DOM is the right call for widget-level components (see lessons
// 10–13), but for top-level views you usually WANT the page's global
// stylesheet to reach the content — headings, code, anchors, etc. all
// inherit from styles/main.css. Inside a shadow root, those rules
// wouldn't cross the boundary and every view would have to redeclare
// its own typography. Both views in this lesson use light DOM for that
// reason; the same applies to preferences-view.js.
class ListView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h2>List view</h2>
      <p>Default route at <code>#/list</code>. Try navigating to Preferences and back — this list re-renders cleanly because the view is destroyed and re-created on each route change.</p>

      <ul>
        ${SAMPLE_ITEMS.map(item => `
          <li>Lesson ${item.lesson}: <strong>${item.label}</strong></li>
        `).join('')}
      </ul>
    `;
  }
}
customElements.define('list-view', ListView);
