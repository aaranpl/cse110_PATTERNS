/**
 * Tiny hash router.
 *
 * - register(path, elementName, title?) — maps a hash path to a custom
 *   element name; optional title updates document.title on activation.
 * - start() — begins listening for hashchange and renders the current route.
 *
 * The URL hash is the source of truth: read it to know which view is
 * active. Update it (via <a href="#/...">) to navigate. The browser's
 * back/forward buttons work for free because they manipulate the hash.
 *
 * On each route change, the outlet's children are REPLACED (the old
 * view is destroyed; a new one is constructed). This is the simplest
 * model: views are stateless about the route. State that should
 * persist across navigations lives elsewhere (localStorage, a shared
 * model, etc.).
 *
 * INTENTIONAL LIMITATIONS — this router is small so the pattern is easy
 * to see. Real routers handle most of these:
 *   - No route parameters (e.g., "/users/:id"). Paths are exact-match strings.
 *   - No query strings: "#/list?filter=done" won't match the "/list" route.
 *   - No nested routes: one outlet, one active view at a time.
 *   - No programmatic navigate() helper — set window.location.hash directly.
 *   - The URL hash is now an app-wide resource OWNED by the router. In-page
 *     anchor links like <a href="#section1"> will collide with route
 *     matching and render "No route registered". Use scroll-to-id JS or
 *     query params on a route path if you need in-page anchors.
 */
export class Router {
  constructor(outletEl, defaultPath = '/list') {
    this.outlet = outletEl;
    this.defaultPath = defaultPath;
    this.routes = new Map();
  }

  register(path, elementName, title = null) {
    this.routes.set(path, { elementName, title });
    return this;
  }

  start() {
    // Guard against double-start (which would double-bind hashchange).
    if (this._started) return;
    this._started = true;
    window.addEventListener('hashchange', () => this.render());
    this.render();
  }

  currentPath() {
    const raw = window.location.hash.replace(/^#/, '');
    return (raw === '' || raw === '/') ? this.defaultPath : raw;
  }

  render() {
    const path = this.currentPath();
    const route = this.routes.get(path);
    if (route) {
      this.outlet.replaceChildren(document.createElement(route.elementName));
      if (route.title) document.title = route.title;
    } else {
      const notFound = document.createElement('p');
      notFound.textContent = `No route registered for "${path}"`;
      this.outlet.replaceChildren(notFound);
    }
    this._updateNavActive(path);
  }

  _updateNavActive(currentPath) {
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href') ?? '';
      const linkPath = href.replace(/^#/, '');
      if (linkPath === currentPath) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }
}
