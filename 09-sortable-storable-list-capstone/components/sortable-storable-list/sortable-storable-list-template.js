/**
 * Template for <sortable-storable-list>.
 * Renders two dropdowns (sort strategy + storage backend), a name input + Add
 * button, and the sorted list of items each with a Remove button.
 *
 * @param {{
 *   strategy: string,
 *   storage: string,
 *   strategyLabels: Record<string,string>,
 *   storageLabels: Record<string,string>,
 *   items: Array<{id:number, name:string, createdAt:number}>
 * }} params
 * @returns {string} HTML string
 */
export const template = ({ strategy, storage, strategyLabels, storageLabels, items }) => `
  <div class="controls">
    <div class="control-group">
      <label for="strategy-select">Sort:</label>
      <select id="strategy-select" data-role="strategy-select">
        ${Object.entries(strategyLabels).map(([key, label]) => `
          <option value="${key}"${key === strategy ? ' selected' : ''}>${label}</option>
        `).join('')}
      </select>
    </div>

    <div class="control-group">
      <label for="storage-select">
        Storage:
        <span class="storage-badge ${storage}">${storageLabels[storage] ?? storage}</span>
      </label>
      <select id="storage-select" data-role="storage-select">
        ${Object.entries(storageLabels).map(([key, label]) => `
          <option value="${key}"${key === storage ? ' selected' : ''}>${label}</option>
        `).join('')}
      </select>
    </div>
  </div>

  <div class="add-row">
    <input
      type="text"
      data-role="name-input"
      placeholder="Item name…"
      aria-label="New item name"
    />
    <button class="btn btn-primary" data-action="add">Add</button>
  </div>

  <ul>
    ${items.length === 0
      ? '<li class="empty">No items yet — add one above.</li>'
      : items.map(item => `
          <li>
            <div class="item-info">
              <span class="name">${escapeHtml(item.name)}</span>
              <time datetime="${new Date(item.createdAt).toISOString()}">
                ${new Date(item.createdAt).toLocaleString()}
              </time>
            </div>
            <button
              class="btn btn-remove"
              data-action="remove"
              data-id="${item.id}"
              aria-label="Remove ${escapeHtml(item.name)}"
            >Remove</button>
          </li>
        `).join('')
    }
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
