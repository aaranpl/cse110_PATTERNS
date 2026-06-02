export const styles = `
  :host {
    display: block;
    font-family: system-ui, sans-serif;
  }

  .counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    max-width: 320px;
    margin: 0 auto;
  }

  .display {
    font-size: 5rem;
    font-weight: 700;
    line-height: 1;
    min-width: 4ch;
    text-align: center;
    color: #212529;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .controls {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  button {
    font-family: system-ui, sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.1s ease;
    line-height: 1;
  }

  button:active {
    transform: scale(0.95);
  }

  button[data-action="increment"],
  button[data-action="decrement"] {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    background-color: #0d6efd;
    color: #fff;
  }

  button[data-action="increment"]:hover,
  button[data-action="decrement"]:hover {
    background-color: #0b5ed7;
  }

  button[data-action="reset"] {
    padding: 0 1.25rem;
    height: 3rem;
    font-size: 1rem;
    background-color: #6c757d;
    color: #fff;
  }

  button[data-action="reset"]:hover {
    background-color: #5c636a;
  }

  button:focus-visible {
    outline: 3px solid #0d6efd;
    outline-offset: 3px;
  }
`;
