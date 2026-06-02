/**
 * Returns the HTML string for <todo-list>.
 *
 * Each todo is rendered as a <todo-item> element with attributes.
 * The delegated click handler in <todo-list>'s constructor reads
 * data-action and data-id from whatever element was clicked — including
 * elements inside the <todo-item> shadow roots via composed click events.
 *
 * @param {Array<{ id: number, text: string, done: boolean }>} todos
 */
export const template = (todos) => {
  if (!todos.length) {
    return `<p class="empty-state">No todos yet — add one above!</p>`;
  }
  const items = todos
    .map(({ id, text, done }) =>
      `<todo-item todo-id="${id}" text="${escapeAttr(text)}"${done ? ' done' : ''}></todo-item>`
    )
    .join('\n    ');
  return `<ul class="todo-list" aria-label="Todo list">\n    ${items}\n  </ul>`;
};

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}
