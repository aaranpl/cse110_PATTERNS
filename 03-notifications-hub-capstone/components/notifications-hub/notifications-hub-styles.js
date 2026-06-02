export const styles = `
  :host {
    display: block;
    font-family: system-ui, sans-serif;
  }

  /* Publisher row — slotted children sit here */
  .publishers {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  /* Stacks section */
  .stacks-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: .75rem;
  }

  .stacks-header h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .clear-btn {
    padding: .35rem .75rem;
    font-size: .85rem;
    background: #e5e7eb;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-family: system-ui, sans-serif;
  }

  .clear-btn:hover { background: #d1d5db; }

  .stacks-grid {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .source-stack {
    flex: 1;
    min-width: 180px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: .75rem;
    background: #fff;
  }

  .source-stack h3 {
    margin: 0 0 .5rem 0;
    font-size: .95rem;
    color: #374151;
    text-transform: capitalize;
  }

  .source-stack p {
    margin: 0;
    font-size: .8rem;
    color: #9ca3af;
    font-style: italic;
  }

  /* Notification entries */
  .notification {
    padding: .4rem .6rem;
    border-radius: 4px;
    margin-bottom: .35rem;
    font-size: .85rem;
    line-height: 1.4;
    border-left: 3px solid transparent;
  }

  .notification:last-child { margin-bottom: 0; }

  .notification.info {
    background: #eff6ff;
    border-left-color: #3b82f6;
    color: #1e40af;
  }

  .notification.warn {
    background: #fffbeb;
    border-left-color: #f59e0b;
    color: #92400e;
  }

  .notification.error {
    background: #fef2f2;
    border-left-color: #ef4444;
    color: #991b1b;
  }

  .notification .meta {
    font-size: .75rem;
    opacity: .7;
    margin-top: .2rem;
  }

  .empty { color: #9ca3af; font-style: italic; margin: .25rem 0; }
`;
