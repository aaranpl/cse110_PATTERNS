function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderTaskList(tasks, pendingIds) {
  if (tasks.length === 0) {
    return `<p class="empty-state">No tasks yet. Add one above.</p>`;
  }

  const items = tasks.map(task => {
    const isPending = pendingIds.has(task.id);
    return `
    <li class="task-item">
      <input
        type="checkbox"
        data-role="toggle-done"
        data-id="${task.id}"
        ${task.done ? 'checked' : ''}
        ${isPending ? 'disabled' : ''}
        aria-label="Mark &quot;${escapeHtml(task.text)}&quot; as ${task.done ? 'not done' : 'done'}"
      >
      <span class="task-text${task.done ? ' done' : ''}">${escapeHtml(task.text)}</span>
      <button
        class="btn btn-danger"
        data-action="remove"
        data-id="${task.id}"
        ${isPending ? 'disabled' : ''}
        aria-label="Delete task: ${escapeHtml(task.text)}"
      >Delete</button>
    </li>
  `;
  }).join('');

  return `<ul class="task-list">${items}</ul>`;
}

export function template({ listState, error, tasks, opError, pendingIds = new Set(), isCreating = false }) {
  let listContent;

  if (listState === 'loading') {
    listContent = `
      <div class="loading-state">
        <div class="spinner" aria-hidden="true"></div>
        <span>Loading tasks…</span>
      </div>
    `;
  } else if (listState === 'error') {
    listContent = `
      <div class="error-state" role="alert">
        <p><strong>Failed to load tasks:</strong> ${escapeHtml(error)}</p>
        <button class="btn btn-retry" data-action="retry-load">Retry</button>
      </div>
    `;
  } else {
    // 'idle' (before service set) or 'success'
    listContent = renderTaskList(tasks, pendingIds);
  }

  return `
    <form class="create-form" data-role="create-form">
      <input
        type="text"
        name="text"
        placeholder="New task…"
        autocomplete="off"
        aria-label="New task text"
        maxlength="200"
        ${isCreating ? 'disabled' : ''}
      >
      <button type="submit" class="btn btn-primary" ${isCreating ? 'disabled' : ''}>${isCreating ? 'Adding…' : 'Add'}</button>
    </form>
    <section aria-label="Task list">
      ${listContent}
    </section>
    ${opError ? `<div class="op-error" role="alert">${escapeHtml(opError)}</div>` : ''}
  `;
}
