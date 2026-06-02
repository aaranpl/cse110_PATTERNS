# Lesson 13 — CRUD

Runs out of the box with an in-memory backend (simulated 200–500 ms
latency).

## Optional: REST backend via json-server

```bash
npm install -g json-server
echo '{"tasks":[]}' > db.json
json-server --watch db.json --port 3001
```

Then add a `RestBackend` (left as a student exercise) that implements
`list/create/update/remove` against `http://localhost:3001/tasks`.

### RestBackend sketch

```javascript
export class RestBackend {
  #base = 'http://localhost:3001/tasks';

  async list() {
    const res = await fetch(this.#base);
    return res.json();
  }

  async create(task) {
    const res = await fetch(this.#base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return res.json();
  }

  async update(id, patch) {
    const res = await fetch(`${this.#base}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    return res.json();
  }

  async remove(id) {
    await fetch(`${this.#base}/${id}`, { method: 'DELETE' });
  }
}
```

To wire it up, change one line in `scripts/main.js`:

```javascript
// Before
const service = new TasksService(new MemoryBackend());

// After
const service = new TasksService(new RestBackend());
```

The `<task-manager>` component doesn't change at all — it only ever
calls `service.list()`, `service.create()`, `service.update()`, and
`service.remove()`. That's the pedagogical point: the service facade
absorbs the implementation detail.
