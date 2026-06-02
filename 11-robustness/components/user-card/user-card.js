import { template } from './user-card-template.js';
import { styles } from './user-card-styles.js';

const TIMEOUT_MS = 3000;
const RETRY_ATTEMPTS = 3;

// Public endpoints used by the "error" and "timeout" scenarios.
//   ERROR_URL — returns HTTP 500, demonstrates a server-side failure
//                that fetch RESOLVES (it got a response) but with res.ok = false.
//   SLOW_URL  — delays 10 seconds. Outlasts TIMEOUT_MS so the AbortController
//                fires and we get our TimeoutError back from fetch.
//
// A note on test reliability: depending on a public endpoint to demonstrate
// failure is itself a kind of fragility — httpbin.org has had outages, rate
// limits, and slow DNS in the past. If you see unexpected failures here,
// httpstat.us is a common mirror:
//   ERROR_URL: 'https://httpstat.us/500'
//   SLOW_URL:  'https://httpstat.us/200?sleep=10000'
// The real fix is dependency injection (lesson 08): inject `fetch` so tests
// don't touch the network at all. The "What's next" callout in index.html
// makes that point — this comment is here to remind you that you're seeing
// the problem first-hand whenever the demo flakes.
const ERROR_URL = 'https://httpbin.org/status/500';
const SLOW_URL  = 'https://httpbin.org/delay/10';

/**
 * Custom error subclass. Using `instanceof TimeoutError` in a catch block
 * is more robust than string-matching err.message, and the class name
 * also shows up in stack traces and devtools.
 */
class TimeoutError extends Error {
  constructor(ms) {
    super(`Request timed out after ${ms}ms`);
    this.name = 'TimeoutError';
  }
}

/**
 * Run a fetch with a hard ceiling. The pattern:
 *   1. Make an AbortController and pass its signal to fetch.
 *   2. Start a timer that calls controller.abort(reason) if it fires.
 *   3. Whichever resolves first wins; clearTimeout in finally cleans up the loser.
 *
 * Passing a TimeoutError as the abort reason means fetch rejects with THAT
 * error directly (rather than the default DOMException AbortError), so the
 * caller can do `err instanceof TimeoutError` without translation.
 *
 * Note: AbortController is the modern replacement for the older
 * Promise.race([fetch, timer]) pattern — race leaves the losing fetch
 * running in the background, which wastes bandwidth and can leak.
 */
async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new TimeoutError(ms)), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return res;
  } finally {
    clearTimeout(timer);
  }
}

// Promise-returning sleep so we can `await` delays inside async scenarios.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ACTIVE_USER = {
  user_name:  'Jane Smith',
  user_email: 'jane@example.org',
  user_role:  'Product Manager',
};
const SUSPENDED_USER = {
  user_name:  'Joe Example',
  user_email: 'joe@example.org',
  user_role:  'Engineer',
};

/**
 * <user-card scenario="active|suspended|delayed:1500|error|timeout">
 *
 * Self-contained card with explicit states: idle → loading → success | error.
 *
 * The async flow is structured around try/catch with a few layers of safety:
 *   - typed errors (TimeoutError vs generic Error) for branching in catch
 *   - AbortController inside fetchWithTimeout so timed-out requests are
 *     actually cancelled, not just ignored
 *   - an isConnected guard before any post-await DOM write, in case the
 *     element was removed while the promise was pending
 *
 * NOTE: fetch logic is hardcoded inside the component (deliberate — see
 * the "What's next" callout in index.html: this is the testability problem
 * that motivates DI from lesson 08).
 */
class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.attempts = 0;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template()}`;
    this.setState('idle');
    const scenario = this.getAttribute('scenario');
    if (scenario) queueMicrotask(() => this.runScenario(scenario));
  }

  setState(state, statusText) {
    this.dataset.state = state;
    this.shadowRoot.querySelector('.status-line').textContent =
      statusText !== undefined ? statusText
      : state === 'loading' ? 'Loading…'
      : state === 'success' ? 'Loaded'
      : '';
  }

  async runScenario(scenario) {
    this.setState('loading');
    try {
      if (scenario === 'active') {
        await sleep(0);
        this.guard(() => this.populate(ACTIVE_USER, 'active'));
      } else if (scenario === 'suspended') {
        await sleep(0);
        this.guard(() => this.populate(SUSPENDED_USER, 'suspended'));
      } else if (scenario.startsWith('delayed:')) {
        const raw = scenario.slice('delayed:'.length);
        const delay = Number(raw);
        if (!Number.isFinite(delay) || delay < 0) {
          throw new Error(`Invalid delay value: ${JSON.stringify(raw)}`);
        }
        await sleep(delay);
        this.guard(() => this.populate(ACTIVE_USER, 'active'));
      } else if (scenario === 'error') {
        await fetchWithTimeout(ERROR_URL, TIMEOUT_MS);
        // Unreachable — fetchWithTimeout throws on a non-2xx response.
      } else if (scenario === 'timeout') {
        await fetchWithTimeout(SLOW_URL, TIMEOUT_MS);
      } else {
        throw new Error(`Unknown scenario: ${scenario}`);
      }
    } catch (err) {
      // Single catch handles every failure mode in this scenario — typed
      // errors (TimeoutError), generic Errors (HTTP 500, bad input,
      // unknown scenario), and anything fetch itself rejects with
      // (DNS failure, CORS, offline, etc.).
      if (!this.isConnected) return;
      this.showError(err.message);
    }
  }

  // Defends against awaiting a promise then writing to a detached shadowRoot.
  guard(fn) {
    if (this.isConnected) fn();
  }

  populate(data, userStatus) {
    this.shadowRoot.querySelector('user-name').textContent  = data.user_name;
    this.shadowRoot.querySelector('user-email').textContent = data.user_email;
    this.shadowRoot.querySelector('user-role').textContent  = data.user_role;
    this.dataset.userStatus = userStatus;
    this.setState('success');
  }

  showError(message) {
    this.setState('error', message);
    const status = this.shadowRoot.querySelector('.status-line');
    if (this.attempts < RETRY_ATTEMPTS) {
      const retry = document.createElement('button');
      retry.className = 'retry';
      retry.textContent = `Retry (${RETRY_ATTEMPTS - this.attempts} left)`;
      retry.addEventListener('click', () => this.retry());
      status.after(retry);
    }
  }

  // Async retry, same try/catch shape as runScenario. The outcome is
  // randomized (rather than re-running the original scenario) so students
  // see both retry-succeeds and retry-fails in one click-through; a real
  // app would re-invoke the same request that failed.
  async retry() {
    this.attempts++;
    this.shadowRoot.querySelectorAll('.retry').forEach((b) => b.remove());
    this.setState('loading');
    try {
      await sleep(1000);
      if (Math.random() > 0.5) {
        this.guard(() => this.populate({
          user_name:  'Retry Success',
          user_email: 'retry@example.org',
          user_role:  'Test User',
        }, 'active'));
      } else {
        throw new Error(`Retry attempt ${this.attempts} failed`);
      }
    } catch (err) {
      if (this.isConnected) this.showError(err.message);
    }
  }
}

customElements.define('user-card', UserCard);
