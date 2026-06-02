export const styles = `
  :host {
    display: block;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    background: #fafafa;
    min-width: 180px;
  }

  h3 {
    margin: 0 0 .75rem 0;
    font-size: 1rem;
    text-transform: capitalize;
    color: #333;
    font-family: system-ui, sans-serif;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  label {
    font-size: .85rem;
    color: #555;
    font-family: system-ui, sans-serif;
  }

  select,
  input[type="text"] {
    width: 100%;
    padding: .35rem .5rem;
    border: 1px solid #bbb;
    border-radius: 4px;
    font-size: .9rem;
    font-family: system-ui, sans-serif;
    box-sizing: border-box;
    background: #fff;
  }

  select:focus,
  input[type="text"]:focus {
    outline: 2px solid #4f8ef7;
    outline-offset: 1px;
  }

  button {
    margin-top: .5rem;
    width: 100%;
    padding: .45rem .75rem;
    background: #4f8ef7;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: .9rem;
    font-family: system-ui, sans-serif;
    cursor: pointer;
  }

  button:hover {
    background: #3a7ce0;
  }

  button:active {
    transform: scale(0.98);
  }
`;
