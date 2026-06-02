// Duplicated from lesson 07 — capstones intentionally don't share code with their feeder lessons

/**
 * Strategy module — four comparator functions, all matching the signature:
 *   (a, b) => number
 *
 * Negative means a sorts before b; positive means after; zero means equal.
 * Strategy.sort() and Array.sort() both expect this convention.
 *
 * The shared signature is what makes them swappable — the component
 * calling them never needs to know which one it has.
 */

export const strategies = {
  byNameAsc: (a, b) => a.name.localeCompare(b.name),
  byNameDesc: (a, b) => b.name.localeCompare(a.name),
  byDateNewest: (a, b) => b.createdAt - a.createdAt,
  byDateOldest: (a, b) => a.createdAt - b.createdAt,
};

export const strategyLabels = {
  byNameAsc: 'Name (A→Z)',
  byNameDesc: 'Name (Z→A)',
  byDateNewest: 'Date (newest)',
  byDateOldest: 'Date (oldest)',
};
