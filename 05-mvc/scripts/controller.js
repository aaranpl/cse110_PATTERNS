export function connect(model, view) {
  // Guard against accidental double-wiring (e.g. during live demos).
  if (view._mvcConnected) return;
  view._mvcConnected = true;

  view.addEventListener('intent', (e) => {
    const { action } = e.detail;
    if (action === 'increment') model.increment();
    else if (action === 'decrement') model.decrement();
    else if (action === 'reset') model.reset();
  });

  model.addEventListener('value-changed', (e) => {
    view.setAttribute('value', String(e.detail.value));
  });
}
