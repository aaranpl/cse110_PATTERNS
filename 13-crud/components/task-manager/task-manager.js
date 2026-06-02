import { template } from './task-manager-template.js';
import { styles } from './task-manager-styles.js';

class TaskManager extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._service = null;
    this._tasks = [];
    this._listState = 'idle';   // 'idle' | 'loading' | 'success' | 'error'
    this._error = null;
    this._opError = null;
    this._opErrorTimer = null;
    this._pendingIds = new Set();
    this._isCreating = false;

    // All listeners attached in constructor via event delegation
    this.shadowRoot.addEventListener('submit', (e) => {
      if (e.target.dataset.role !== 'create-form') return;
      e.preventDefault();
      const input = this.shadowRoot.querySelector('input[name="text"]');
      const text = input.value.trim();
      if (!text) return;
      this._create(text);
      input.value = '';
    });

    this.shadowRoot.addEventListener('change', (e) => {
      if (e.target.dataset.role === 'toggle-done') {
        const id = Number(e.target.dataset.id);
        this._update(id, { done: e.target.checked });
      }
    });

    this.shadowRoot.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'remove') {
        const id = Number(e.target.dataset.id);
        this._remove(id);
      } else if (e.target.dataset.action === 'retry-load') {
        this._loadList();
      }
    });
  }

  set service(s) {
    this._service = s;
    if (this.isConnected) this._loadList();
  }

  get service() {
    return this._service;
  }

  connectedCallback() {
    this.render();
    if (this._service) this._loadList();
  }

  // Read — load the full task list
  async _loadList() {
    this._listState = 'loading';
    this._error = null;
    this.render();
    try {
      this._tasks = await this._service.list();
      this._listState = 'success';
    } catch (err) {
      this._listState = 'error';
      this._error = err.message;
    }
    this.render();
  }

  // Create
  async _create(text) {
    if (this._isCreating) return;
    this._isCreating = true;
    this.render();
    try {
      const newTask = await this._service.create(text);
      this._tasks = [...this._tasks, newTask];
    } catch (err) {
      this._showOpError('Create failed: ' + err.message);
    } finally {
      this._isCreating = false;
      this.render();
    }
  }

  // Update — optimistic: apply locally first, reconcile with server's
  // response on success, revert on error.
  async _update(id, patch) {
    if (this._pendingIds.has(id)) return; // another update is in flight; ignore
    this._pendingIds.add(id);

    const original = this._tasks.find(t => t.id === id);
    if (!original) { this._pendingIds.delete(id); return; }

    // Optimistic apply — UI feels instant. One render now, one in finally.
    this._tasks = this._tasks.map(t => t.id === id ? { ...t, ...patch } : t);
    this.render();
    try {
      // Reconcile with the server's view. For the memory backend this is
      // effectively a no-op (it returns what we sent), but for a REST
      // backend the server may add fields (updatedAt, normalized text,
      // etc.) — without this assignment the UI silently drifts from
      // server truth. This is the second half of "optimistic update"
      // that demos commonly omit.
      const serverTask = await this._service.update(id, patch);
      this._tasks = this._tasks.map(t => t.id === id ? serverTask : t);
    } catch (err) {
      // Revert to original on failure and queue a toast — the single
      // render in `finally` paints both changes in one pass.
      this._tasks = this._tasks.map(t => t.id === id ? original : t);
      this._showOpError('Update failed: ' + err.message);
    } finally {
      this._pendingIds.delete(id);
      this.render();
    }
  }

  // Delete — optimistic: remove locally first, revert on error.
  async _remove(id) {
    if (this._pendingIds.has(id)) return;
    this._pendingIds.add(id);

    const original = this._tasks;
    this._tasks = this._tasks.filter(t => t.id !== id);
    this.render();
    try {
      await this._service.remove(id);
    } catch (err) {
      this._tasks = original;
      this._showOpError('Delete failed: ' + err.message);
    } finally {
      this._pendingIds.delete(id);
      this.render();
    }
  }

  // Show an ephemeral per-operation error (auto-dismisses after 3s).
  // Does NOT render — the caller is responsible for triggering the next
  // render (usually inside its own finally block, which is about to
  // render anyway). That keeps error paths to a single render per phase
  // instead of two or three.
  _showOpError(msg) {
    this._opError = msg;
    clearTimeout(this._opErrorTimer);
    this._opErrorTimer = setTimeout(() => {
      this._opError = null;
      this.render();
    }, 3000);
  }

  // NOTE: render() replaces the entire shadow content on every state
  // change. Keyboard focus on the input or a button is lost when that
  // element is re-created — fine for this teaching demo, but a production
  // component would do targeted DOM updates (or use a vdom library) to
  // preserve focus across state transitions.
  render() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template({
      listState: this._listState,
      error: this._error,
      tasks: this._tasks,
      opError: this._opError,
      pendingIds: this._pendingIds,
      isCreating: this._isCreating,
    })}`;
  }
}

customElements.define('task-manager', TaskManager);
