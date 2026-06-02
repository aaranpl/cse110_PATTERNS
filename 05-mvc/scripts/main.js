import { CounterModel } from './model.js';
import { connect } from './controller.js';
import '../components/counter-view/counter-view.js';

document.addEventListener('DOMContentLoaded', () => {
  const model = new CounterModel();
  const view = document.querySelector('counter-view');
  connect(model, view);
  view.setAttribute('value', '0');
});
