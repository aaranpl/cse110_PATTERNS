export const template = () => `
  <details open>
    <summary>Debug log</summary>
    <ol class="entries" aria-live="polite"></ol>
  </details>
`;

export const entryTemplate = (entry) => `
  <li class="entry">
    <time>${new Date(entry.timestamp).toLocaleTimeString()}</time>
    <code class="source">${entry.source}</code>
    <span class="type">${entry.type}</span>
    <span class="message">${entry.message}</span>
  </li>
`;
