import '../components/task-manager/task-manager.js';
import { TasksService } from './tasks-service.js';
import { MemoryBackend } from './memory-backend.js';

document.addEventListener('DOMContentLoaded', () => {
  const service = new TasksService(new MemoryBackend());
  const manager = document.querySelector('task-manager');
  manager.service = service;
});
