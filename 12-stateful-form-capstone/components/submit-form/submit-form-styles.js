export const styles = `
  :host {
    display: block;
    font-family: system-ui, sans-serif;
    max-width: 480px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    background: #fff;
    transition: border-color 0.2s ease;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #374151;
  }

  input[type="text"] {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: #fff;
    color: #111827;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  input[type="text"]:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 1px;
    border-color: #3b82f6;
  }

  input[type="text"]:disabled {
    background: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1.25rem;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background 0.15s ease, opacity 0.15s ease;
  }

  button[type="submit"] {
    background: #3b82f6;
    color: #fff;
  }

  button[type="submit"]:hover:not(:disabled) {
    background: #2563eb;
  }

  button[type="submit"]:disabled {
    background: #93c5fd;
    cursor: not-allowed;
    opacity: 0.8;
  }

  button[data-action="submit-another"] {
    background: #10b981;
    color: #fff;
  }

  button[data-action="submit-another"]:hover {
    background: #059669;
  }

  button[data-action="retry"] {
    background: #ef4444;
    color: #fff;
  }

  button[data-action="retry"]:hover {
    background: #dc2626;
  }

  button[data-action="cancel"] {
    background: #e5e7eb;
    color: #374151;
  }

  button[data-action="cancel"]:hover {
    background: #d1d5db;
  }

  .success-banner,
  .error-banner {
    margin: 0;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .success-banner {
    color: #065f46;
  }

  .error-banner {
    color: #991b1b;
  }

  /* State-driven host border colors */
  :host([data-state="submitting"]) form {
    border-color: #93c5fd;
    animation: pulse-border 1s ease-in-out infinite alternate;
  }

  :host([data-state="success"]) form {
    border-color: #10b981;
    background: #f0fdf4;
  }

  :host([data-state="error"]) form {
    border-color: #ef4444;
    background: #fef2f2;
  }

  @keyframes pulse-border {
    from { border-color: #93c5fd; }
    to   { border-color: #3b82f6; }
  }

  /* Visually hidden but accessible ARIA live region */
  .aria-live {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
