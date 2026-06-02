/**
 * Renders a single notification entry.
 * @param {{ level: string, message: string, timestamp: number }} n
 */
const notificationHTML = (n) => `
  <div class="notification ${n.level}">
    <span class="message">${n.message}</span>
    <div class="meta">${n.level.toUpperCase()} &bull; ${new Date(n.timestamp).toLocaleTimeString()}</div>
  </div>
`;

/**
 * Renders the stacks display area from a Map<source, notification[]>.
 * Called on every update — returns just the inner stacks markup.
 * @param {Map<string, Array>} stacks
 */
export const stacksHTML = (stacks) => {
  if (stacks.size === 0) {
    return `<p class="empty">No notifications yet. Click "Send notification" in any publisher above.</p>`;
  }
  return [...stacks.entries()].map(([source, entries]) => `
    <div class="source-stack">
      <h3>${source}</h3>
      ${entries.length === 0
        ? `<p>No notifications.</p>`
        : entries.map(notificationHTML).join('')}
    </div>
  `).join('');
};

/**
 * Full initial template — rendered once in connectedCallback.
 * The <slot> projects the <status-publisher> light-DOM children into the hub.
 */
export const template = () => `
  <div class="publishers">
    <slot></slot>
  </div>

  <div class="stacks-header">
    <h2>Notifications</h2>
    <button class="clear-btn" data-action="clear-all">Clear all</button>
  </div>

  <section id="stacks-grid" class="stacks-grid" aria-live="polite">
    <p class="empty">No notifications yet. Click "Send notification" in any publisher above.</p>
  </section>
`;
