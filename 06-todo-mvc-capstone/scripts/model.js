/**
 * Todo model — owns the array, emits change events.
 *
 * Same pattern as lesson 05's CounterModel: extends EventTarget so the
 * Controller can subscribe with addEventListener like any DOM node.
 * The Model never touches the DOM; it knows nothing about any View.
 */
export class TodoModel extends EventTarget {
  #todos = [];
  #nextId = 1;

  list() { return [...this.#todos]; }

  add(text) {
    const trimmed = String(text ?? '').trim();
    if (!trimmed) return;
    this.#todos.push({ id: this.#nextId++, text: trimmed, done: false });
    this.#emit();
  }

  toggle(id) {
    const todo = this.#todos.find(t => t.id === id);
    if (!todo) return;
    todo.done = !todo.done;
    this.#emit();
  }

  remove(id) {
    this.#todos = this.#todos.filter(t => t.id !== id);
    this.#emit();
  }

  #emit() {
    this.dispatchEvent(new CustomEvent('todos-changed', {
      detail: { todos: this.list() }
    }));
  }
}
