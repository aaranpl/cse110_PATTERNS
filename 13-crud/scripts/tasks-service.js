/**
 * TasksService — a thin facade over any backend that implements
 * list(), create(task), update(id, patch), remove(id).
 *
 * The component depends on this service, not on a specific backend.
 * That's the DI win: swap memory for REST without touching the component.
 */
export class TasksService {
  constructor(backend) {
    this.backend = backend;
  }

  list() {
    return this.backend.list();
  }

  create(text) {
    return this.backend.create({ text, done: false, createdAt: Date.now() });
  }

  update(id, patch) {
    return this.backend.update(id, patch);
  }

  remove(id) {
    return this.backend.remove(id);
  }
}
