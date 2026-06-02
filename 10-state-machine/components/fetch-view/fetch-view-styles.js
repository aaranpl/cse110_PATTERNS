export const styles = `
  :host {
    display: block;
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 1.5rem;
    background: #fdfdfd;
    transition: border-color 0.3s ease, background 0.3s ease;
  }

  :host([data-state="idle"]) {
    border-color: #ccc;
    background: #fdfdfd;
  }

  :host([data-state="loading"]) {
    border-color: #6366f1;
    background: #f5f3ff;
    cursor: wait;
  }

  :host([data-state="success"]) {
    border-color: #16a34a;
    background: #f0fdf4;
  }

  :host([data-state="error"]) {
    border-color: #dc2626;
    background: #fef2f2;
  }

  h2 { margin-top: 0; font-size: 1.1rem; }
  h2 code { font-size: 1rem; background: #f1f5f9; padding: 0.1em 0.4em; border-radius: 4px; }

  .state-view {
    min-height: 3rem;
    margin: 1rem 0;
    display: flex;
    align-items: center;
  }

  .state-view p { margin: 0; }

  .idle-msg { color: #64748b; }

  .spinner {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #6366f1;
    font-style: italic;
  }

  .spinner::before {
    content: "";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid #c7d2fe;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .success {
    color: #15803d;
    font-weight: 600;
  }

  .error {
    color: #dc2626;
    font-weight: 600;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  button {
    padding: 0.4rem 0.9rem;
    border: 1px solid #94a3b8;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.15s ease;
  }

  button:hover { background: #f1f5f9; }

  button[data-action="reset"] {
    border-color: #6366f1;
    color: #4338ca;
  }

  button[data-action="retry"] {
    border-color: #dc2626;
    color: #dc2626;
  }

  :host([data-state="loading"]) button[data-action="fetchOk"],
  :host([data-state="loading"]) button[data-action="fetchFail"] {
    opacity: 0.5;
    pointer-events: none;
  }
`;
