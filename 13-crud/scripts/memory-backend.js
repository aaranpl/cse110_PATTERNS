/**
 * In-memory backend with simulated latency.
 *
 * All methods return Promises so the same interface works for sync
 * (memory) and async (REST) backends — the calling component doesn't
 * need to know which it has.
 */
export class MemoryBackend {
  #tasks = [];
  #nextId = 1;

  async list() {
    await this.#delay();
    return [...this.#tasks];
  }

  async create(task) {
    await this.#delay();
    const t = { ...task, id: this.#nextId++ };
    this.#tasks.push(t);
    return t;
  }

  async update(id, patch) {
    await this.#delay();
    const t = this.#tasks.find(t => t.id === id);
    if (!t) throw new Error(`Task ${id} not found`);
    Object.assign(t, patch);
    return t;
  }

  async remove(id) {
    await this.#delay();
    this.#tasks = this.#tasks.filter(t => t.id !== id);
  }

  #delay() {
    return new Promise(r => setTimeout(r, 200 + Math.random() * 300));
  }
}
