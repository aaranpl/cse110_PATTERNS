/**
 * State machine for a simple fetch flow.
 *
 * States: idle, loading, success, error
 * Events: fetch, resolve, reject, reset, retry
 *
 * The transitions table is the contract: which events are valid from
 * which states. Anything not in the table is rejected.
 */

export const transitions = {
  idle:    { fetch: 'loading' },
  loading: { resolve: 'success', reject: 'error' },
  success: { reset: 'idle' },
  error:   { reset: 'idle', retry: 'loading' },
};

/**
 * Compute the next state given a current state and an event.
 * Returns the current state unchanged if the transition is invalid,
 * with a console warning so the misuse is visible during development.
 */
export function next(state, event) {
  const target = transitions[state]?.[event];
  if (!target) {
    console.warn(`[machine] Invalid transition: state "${state}" does not handle event "${event}". Check the transitions table in machine.js.`);
    return state;
  }
  return target;
}
