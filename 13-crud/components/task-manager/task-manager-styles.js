export const styles = `
  :host {
    display: block;
    font-family: system-ui, sans-serif;
    max-width: 600px;
  }

  /* Create form */
  .create-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .create-form input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .create-form input:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 1px;
    border-color: #3b82f6;
  }

  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .btn-primary {
    background: #3b82f6;
    color: #fff;
  }

  .btn-primary:hover {
    background: #2563eb;
  }

  .btn-danger {
    background: #ef4444;
    color: #fff;
    padding: 0.25rem 0.6rem;
    font-size: 0.8rem;
  }

  .btn-danger:hover {
    background: #dc2626;
  }

  .btn-retry {
    background: #f59e0b;
    color: #fff;
    margin-top: 0.5rem;
  }

  .btn-retry:hover {
    background: #d97706;
  }

  /* Loading state */
  .loading-state {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #6b7280;
    padding: 1rem 0;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Error state */
  .error-state {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 1rem;
    color: #b91c1c;
  }

  .error-state p {
    margin: 0 0 0.5rem;
  }

  /* Task list */
  .task-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .task-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid #f3f4f6;
    border-radius: 4px;
    transition: background 0.1s;
  }

  .task-item:last-child {
    border-bottom: none;
  }

  .task-item:hover {
    background: #f9fafb;
  }

  .task-item input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    cursor: pointer;
    flex-shrink: 0;
    accent-color: #3b82f6;
  }

  .task-text {
    flex: 1;
    font-size: 1rem;
    transition: opacity 0.2s;
  }

  .task-text.done {
    text-decoration: line-through;
    color: #9ca3af;
  }

  .empty-state {
    color: #9ca3af;
    font-style: italic;
    padding: 1rem 0;
  }

  /* Operation error toast */
  .op-error {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    background: #ef4444;
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 6px;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.2s ease;
    z-index: 100;
  }

  @keyframes slideIn {
    from { transform: translateY(8px); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }
`;
