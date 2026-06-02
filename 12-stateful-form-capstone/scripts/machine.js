/**
 * State machine for a submit form.
 *
 * Duplicated from lesson 10 (which introduced the pattern) — per the
 * curriculum's duplicate-per-lesson rule, each lesson stands alone.
 *
 * States: idle, submitting, success, error
 * Events: submit, resolve, reject, reset, retry
 */

export const transitions = {
  idle:       { submit: 'submitting' },
  submitting: { resolve: 'success', reject: 'error' },
  success:    { reset: 'idle' },
  error:      { reset: 'idle', retry: 'submitting' },
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
