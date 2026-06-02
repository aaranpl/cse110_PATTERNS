/**
 * Controller — the only layer that knows about both the Model and the Views.
 *
 * Wires <todo-input> and <todo-list> intent events to Model methods, and
 * subscribes to the Model's todos-changed event to push updates to the list.
 *
 * Same MVC isolation contract as lesson 05: the Model doesn't know about the
 * Views, the Views don't know about the Model, and the Controller bridges them.
 */
export function connect(model, input, list) {
  // Guard against accidental double-wiring (e.g. during live demos).
  if (input._connected || list._connected) return;
  input._connected = list._connected = true;

  const handleIntent = (e) => {
    const { action, text, id } = e.detail;
    if (action === 'add') model.add(text);
    else if (action === 'toggle') model.toggle(id);
    else if (action === 'remove') model.remove(id);
  };

  input.addEventListener('intent', handleIntent);
  list.addEventListener('intent', handleIntent);

  model.addEventListener('todos-changed', (e) => {
    list.todos = e.detail.todos;
  });
}
