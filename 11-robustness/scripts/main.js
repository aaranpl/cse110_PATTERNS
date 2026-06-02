import '../components/user-card/user-card.js';
import '../components/test-bench/test-bench.js';

// "Last-resort" global handlers — these catch what nothing else did.
//
// The point of these listeners isn't error MESSAGING (the browser already
// logs uncaught errors to the console for free). The point is that YOUR
// code gets a hook: in production this is where you'd forward the error
// to a tracking service (Sentry, Rollbar, Datadog), show a degraded-mode
// UI, or persist a breadcrumb for a later bug report.
//
// To make that point visible to students, each handler also paints a
// banner on the page — so the safety net isn't just an invisible console
// line, it's something the listener actively did.

// Uncaught SYNCHRONOUS throws — e.g. the "Trigger Runtime Error" button.
window.addEventListener('error', (event) => {
  console.error('[error event] uncaught synchronous error:', event.error);
  showSafetyNetBanner({
    kind: 'sync',
    title: 'window.error fired',
    detail: `Caught an uncaught synchronous throw: ${event.error?.message ?? event.message}`,
  });
});

// Rejected promises with no .catch() and no try-around-await —
// e.g. the "Trigger Unhandled Rejection" button.
window.addEventListener('unhandledrejection', (event) => {
  console.error('[unhandledrejection event] unhandled promise rejection:', event.reason);
  showSafetyNetBanner({
    kind: 'async',
    title: 'window.unhandledrejection fired',
    detail: `Caught a promise rejection that nothing handled: ${event.reason?.message ?? event.reason}`,
  });
});

function showSafetyNetBanner({ kind, title, detail }) {
  const banner = document.createElement('div');
  banner.className = `safety-net-banner safety-net-banner--${kind}`;
  banner.setAttribute('role', 'alert');

  const heading = document.createElement('strong');
  heading.textContent = title;

  const body = document.createElement('p');
  body.className = 'safety-net-banner__detail';
  body.textContent = detail;

  const hint = document.createElement('p');
  hint.className = 'safety-net-banner__hint';
  hint.textContent =
    'In production this listener would forward the error to a tracking service ' +
    '(Sentry, Rollbar, Datadog). It is the LAST line of defense — caught here ' +
    'means no try/catch or .catch() in user code handled it first.';

  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'safety-net-banner__close';
  dismiss.setAttribute('aria-label', 'Dismiss');
  dismiss.textContent = '×';
  dismiss.addEventListener('click', () => banner.remove());

  banner.append(heading, body, hint, dismiss);
  document.body.prepend(banner);
}
