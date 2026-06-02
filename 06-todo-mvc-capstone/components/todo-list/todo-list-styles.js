export const styles = `
  :host {
    display: block;
    font-family: system-ui, sans-serif;
  }

  .todo-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .empty-state {
    margin: 0;
    padding: 1.5rem;
    text-align: center;
    color: #adb5bd;
    font-size: 0.9375rem;
    font-style: italic;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
  }

  todo-item {
    display: block;
    font-family: system-ui, sans-serif;
  }

  /*
   * Styles for <todo-item> children live here (not in todo-item itself)
   * because <todo-item> uses light DOM. Its rendered markup is slotted
   * directly into <todo-list>'s shadow root, so these rules scope correctly
   * from here. Rules are prefixed with todo-item to avoid leaking.
   */
  todo-item .todo-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    transition: background-color 0.15s ease;
    list-style: none;
  }

  todo-item .todo-item.done {
    background: #f8f9fa;
  }

  todo-item .todo-item-checkbox {
    flex-shrink: 0;
    width: 1.125rem;
    height: 1.125rem;
    accent-color: #0d6efd;
    cursor: pointer;
  }

  todo-item .todo-item-text {
    flex: 1;
    font-size: 1rem;
    color: #212529;
    word-break: break-word;
    transition: color 0.15s ease, text-decoration 0.15s ease;
  }

  todo-item .todo-item.done .todo-item-text {
    color: #6c757d;
    text-decoration: line-through;
  }

  todo-item .todo-item-remove {
    flex-shrink: 0;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    width: 1.75rem;
    height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: #adb5bd;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
    padding: 0;
    line-height: 1;
  }

  todo-item .todo-item-remove:hover {
    background-color: #fff0f0;
    color: #dc3545;
  }

  todo-item .todo-item-remove:focus-visible {
    outline: 3px solid #0d6efd;
    outline-offset: 2px;
  }
`;
