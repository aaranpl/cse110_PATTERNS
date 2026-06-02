/**
 * Returns the HTML string for <todo-input>.
 * A <form> wrapping the input + button so the Enter key submits without
 * extra key-event handling — the form's submit event handles both.
 */
export const template = () => `
  <form class="todo-input-form" aria-label="Add a new todo">
    <input
      type="text"
      class="todo-input-field"
      placeholder="What needs to be done?"
      aria-label="New todo text"
      autocomplete="off"
    />
    <button type="submit" class="todo-input-btn" aria-label="Add todo">Add</button>
  </form>
`;
