/**
 * Template for <sortable-list>.
 * Renders a strategy dropdown and the sorted list of items.
 *
 * @param {{ strategy: string, labels: Record<string,string>, items: Array<{name:string, createdAt:number}> }} params
 * @returns {string} HTML string
 */
export const template = ({ strategy, labels, items }) => `
  <header>
    <label>
      Sort by:
      <select data-role="strategy-select">
        ${Object.entries(labels).map(([key, label]) => `
          <option value="${key}"${key === strategy ? ' selected' : ''}>${label}</option>
        `).join('')}
      </select>
    </label>
  </header>
  <ul>
    ${items.map(item => `
      <li>
        <span class="name">${escapeHtml(item.name)}</span>
        <time>${new Date(item.createdAt).toLocaleDateString()}</time>
      </li>
    `).join('')}
  </ul>
`;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}
