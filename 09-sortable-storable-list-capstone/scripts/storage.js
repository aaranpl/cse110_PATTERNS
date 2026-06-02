// Duplicated from lesson 08 — capstones intentionally don't share code with their feeder lessons
// Change: LocalStorageAdapter default key updated from 'patterns:08:tasks' to 'patterns:09:tasks'

class MemoryStorage {
  constructor() {
    this.data = [];
  }

  save(tasks) {
    this.data = [...tasks];
  }

  load() {
    return [...this.data];
  }

  getName() {
    return 'Memory';
  }
}

class LocalStorageAdapter {
  constructor(key = 'patterns:09:tasks') {
    this.key = key;
  }

  save(tasks) {
    window.localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  load() {
    const stored = window.localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  }

  getName() {
    return 'LocalStorage';
  }
}

// Storage factory - handles creating the right storage type
export class StorageFactory {
  static createStorage(type, options = {}) {
    switch (type.toLowerCase()) {
      case 'memory':
        return new MemoryStorage();
      case 'localstorage':
        return new LocalStorageAdapter();
      default:
        console.warn(`Unknown storage type: ${type}. Using memory storage.`);
        return new MemoryStorage();
    }
  }
}
