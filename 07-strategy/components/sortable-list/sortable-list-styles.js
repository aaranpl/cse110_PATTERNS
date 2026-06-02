export const styles = `
  :host {
    display: block;
    font-family: system-ui, sans-serif;
  }

  header {
    margin-bottom: 1rem;
  }

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #343a40;
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

  .name {
    font-weight: 600;
    color: #0d1117;
    font-size: 1rem;
  }

  time {
    font-size: 0.85rem;
    color: #6c757d;
    font-variant-numeric: tabular-nums;
  }
`;
