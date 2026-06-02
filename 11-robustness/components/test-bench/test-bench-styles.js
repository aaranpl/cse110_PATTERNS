export const styles = `
  :host { display: block; }
  .controls {
    margin: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 6px;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  button {
    padding: .5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    min-width: 120px;
  }
  button:hover { background: #f0f0f0; }
  button.danger { background: #dc2626; color: white; border-color: #dc2626; }
  button.danger:hover { opacity: .9; }
`;
