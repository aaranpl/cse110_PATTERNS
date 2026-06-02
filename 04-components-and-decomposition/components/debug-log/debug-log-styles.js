export const styles = `
  :host {
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: .5rem 1rem;
    margin: 2rem 0;
    font-family: ui-monospace, monospace;
    font-size: .85rem;
  }
  summary { cursor: pointer; font-weight: bold; }
  .entries { list-style: none; padding: 0; margin: .5rem 0 0; max-height: 12rem; overflow-y: auto; }
  .entry { display: grid; grid-template-columns: 7em 10em 8em 1fr; gap: .5em; padding: .15em 0; }
  .source { color: #06c; }
  .type { color: #666; }
`;
