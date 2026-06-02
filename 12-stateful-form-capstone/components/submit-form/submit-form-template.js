// The aria-live region is intentionally NOT in this template — it lives
// in the persistent shadow DOM scaffold built once in connectedCallback,
// and only its textContent is mutated. Replacing a live region on every
// render makes screen readers miss the announcement.

export const template = ({ state, message, error, lastSubmitted }) => `
  <form>
    <label>
      Message:
      <input type="text"
             name="message"
             value="${escapeAttr(message)}"
             ${state === 'submitting' || state === 'success' ? 'disabled' : ''}>
    </label>

    <div class="actions">
      ${state === 'idle' ? `<button type="submit">Submit</button>` : ''}
      ${state === 'submitting' ? `<button type="submit" disabled>Submitting…</button>` : ''}
      ${state === 'success' ? `
        <p class="success-banner">✓ Submitted: ${escapeHtml(lastSubmitted)}</p>
        <button type="button" data-action="submit-another">Submit another</button>
      ` : ''}
      ${state === 'error' ? `
        <p class="error-banner">✕ ${escapeHtml(error || 'Submission failed')}</p>
        <button type="button" data-action="retry">Retry</button>
        <button type="button" data-action="cancel">Cancel</button>
      ` : ''}
    </div>
  </form>
`;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function escapeAttr(s) {
  return String(s).replace(/[&"]/g, c => (
    { '&': '&amp;', '"': '&quot;' }[c]
  ));
}
