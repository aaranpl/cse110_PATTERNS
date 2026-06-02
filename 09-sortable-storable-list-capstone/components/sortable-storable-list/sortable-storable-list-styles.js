export const styles = `
  :host {
    display: block;
    font-family: system-ui, sans-serif;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #343a40;
  }

  select {
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
    padding: 0.35rem 0.65rem;
    border: 1px solid #ced4da;
    border-radius: 6px;
    background-color: #fff;
    color: #212529;
    cursor: pointer;
  }

  select:focus-visible {
    outline: 3px solid #0d6efd;
    outline-offset: 2px;
  }

  .add-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .add-row input[type="text"] {
    flex: 1;
    font-family: system-ui, sans-serif;
    font-size: 0.95rem;
    padding: 0.45rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 6px;
    color: #212529;
  }

  .add-row input[type="text"]:focus-visible {
    outline: 3px solid #0d6efd;
    outline-offset: 2px;
  }

  .btn {
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.45rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .btn-primary {
    background-color: #0d6efd;
    color: #fff;
  }

  .btn-primary:hover {
    background-color: #0b5ed7;
  }

  .btn-primary:focus-visible {
    outline: 3px solid #0d6efd;
    outline-offset: 2px;
  }

  .btn-remove {
    background-color: transparent;
    color: #6c757d;
    border: 1px solid #dee2e6;
    font-size: 0.8rem;
    padding: 0.25rem 0.6rem;
  }

  .btn-remove:hover {
    background-color: #f8d7da;
    color: #842029;
    border-color: #f5c2c7;
  }

  .btn-remove:focus-visible {
    outline: 3px solid #dc3545;
    outline-offset: 2px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    transition: background-color 0.15s ease;
  }

  li:hover {
    background-color: #e9ecef;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .name {
    font-weight: 600;
    color: #0d1117;
    font-size: 1rem;
  }

  time {
    font-size: 0.8rem;
    color: #6c757d;
    font-variant-numeric: tabular-nums;
  }

  .empty {
    color: #6c757d;
    font-style: italic;
    font-size: 0.95rem;
    padding: 1rem 0;
  }

  .storage-badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    background-color: #e9ecef;
    color: #495057;
    margin-left: 0.5rem;
    vertical-align: middle;
  }

  .storage-badge.localStorage {
    background-color: #d1e7dd;
    color: #0a3622;
  }
`;
