/**
 * Returns the HTML string for <counter-view>.
 * @param {string} value - The current counter value to display.
 */
export const template = (value) => `
  <div class="counter">
    <div class="display" aria-live="polite" aria-label="Counter value">${value}</div>
    <div class="controls">
      <button data-action="decrement" aria-label="Decrement">&#8722;</button>
      <button data-action="reset" aria-label="Reset">Reset</button>
      <button data-action="increment" aria-label="Increment">&#43;</button>
    </div>
  </div>
`;
