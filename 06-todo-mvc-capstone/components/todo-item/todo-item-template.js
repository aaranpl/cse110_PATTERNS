/**
 * Returns the HTML string for a single <todo-item>.
 *
 * Both the checkbox and the delete button carry data-action and data-id
 * attributes so the parent <todo-list>'s single delegated click handler
 * can identify what to do without any event logic inside this component.
 *
 * @param {{ id: string, text: string, done: boolean }} todo
 */
export const template = ({ id, text, done }) => `
  <li class="todo-item${done ? ' done' : ''}">
    <input
      type="checkbox"
      class="todo-item-checkbox"
      data-action="toggle"
      data-id="${id}"
      ${done ? 'checked' : ''}
      aria-label="Mark ${escapeAttr(text)} as ${done ? 'not done' : 'done'}"
    />
    <span class="todo-item-text">${escapeHtml(text)}</span>
    <button
      class="todo-item-remove"
      data-action="remove"
      data-id="${id}"
      aria-label="Remove ${escapeAttr(text)}"
    >&#10005;</button>
  </li>
`;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}
