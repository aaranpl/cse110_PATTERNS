import { Router } from './router.js';
import '../views/list-view.js';
import '../views/preferences-view.js';

// Note: the stored theme is applied BEFORE this module runs, via the inline
// classic script in index.html's <head>. Doing it there avoids the FOUC
// that would otherwise happen between first paint and DOMContentLoaded.

document.addEventListener('DOMContentLoaded', () => {
  const outlet = document.querySelector('#view-outlet');
  const router = new Router(outlet, '/list');
  router.register('/list',  'list-view',        'List · Routing demo');
  router.register('/prefs', 'preferences-view', 'Preferences · Routing demo');
  router.start();
});
