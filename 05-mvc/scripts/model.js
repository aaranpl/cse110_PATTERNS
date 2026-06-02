/**
 * The Model owns the data and emits change events.
 *
 * We extend EventTarget — normally used for DOM nodes — because it gives
 * us addEventListener / dispatchEvent for free. The Model never touches
 * the DOM, but the Controller can subscribe to it the same way it does
 * for a custom element.
 */
export class CounterModel extends EventTarget {
  #value = 0;
  get value() { return this.#value; }
  increment() { this.#value++; this.#emit(); }
  decrement() { this.#value--; this.#emit(); }
  reset() { this.#value = 0; this.#emit(); }
  #emit() {
    this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.#value } }));
  }
}
