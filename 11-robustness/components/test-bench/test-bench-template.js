export const template = () => `
  <div class="controls">
    <button data-action="run">Run All Tests</button>
    <button data-action="clear">Clear Tests</button>
    <button data-action="error" class="danger">Trigger Runtime Error</button>
    <button data-action="unhandled-rejection" class="danger">Trigger Unhandled Rejection</button>
  </div>
  <slot></slot>
`;
