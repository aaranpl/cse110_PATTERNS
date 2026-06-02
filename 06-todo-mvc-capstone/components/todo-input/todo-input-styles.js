export const styles = `
  :host {
    display: block;
    font-family: system-ui, sans-serif;
  }

  .todo-input-form {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
  }

  .todo-input-field {
    flex: 1;
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    padding: 0.625rem 0.875rem;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    outline: none;
    background: #fff;
    color: #212529;
    transition: border-color 0.15s ease;
  }

  .todo-input-field:focus {
    border-color: #0d6efd;
  }

  .todo-input-field::placeholder {
    color: #adb5bd;
  }

  .todo-input-btn {
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.625rem 1.25rem;
    background-color: #0d6efd;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.1s ease;
    white-space: nowrap;
  }

  .todo-input-btn:hover {
    background-color: #0b5ed7;
  }

  .todo-input-btn:active {
    transform: scale(0.96);
  }

  .todo-input-btn:focus-visible {
    outline: 3px solid #0d6efd;
    outline-offset: 3px;
  }
`;
