function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

export const template = ({ state, data, error }) => `
  <h2>Fetch view — state: <code>${escapeHtml(state)}</code></h2>

  <div class="state-view">
    ${state === 'idle'    ? `<p class="idle-msg">Click a button to fetch.</p>` : ''}
    ${state === 'loading' ? `<p class="spinner">Loading…</p>` : ''}
    ${state === 'success' ? `<p class="success">${escapeHtml(data?.value ?? '')}</p>` : ''}
    ${state === 'error'   ? `<p class="error">${escapeHtml(error ?? '')}</p>` : ''}
  </div>

  <div class="controls">
    <button data-action="fetchOk">Fetch (succeeds)</button>
    <button data-action="fetchFail">Fetch (fails)</button>
    ${state === 'error'                           ? `<button data-action="retry">Retry</button>` : ''}
    ${state === 'success' || state === 'error'    ? `<button data-action="reset">Reset</button>` : ''}
  </div>
`;
