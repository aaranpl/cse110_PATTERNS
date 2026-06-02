import { TodoModel } from './model.js';
import { connect } from './controller.js';
import '../components/todo-input/todo-input.js';
import '../components/todo-list/todo-list.js';
import '../components/todo-item/todo-item.js';

document.addEventListener('DOMContentLoaded', () => {
  const model = new TodoModel();
  const input = document.querySelector('todo-input');
  const list = document.querySelector('todo-list');
  connect(model, input, list);
  list.todos = model.list();  // initial render (empty array)
});
