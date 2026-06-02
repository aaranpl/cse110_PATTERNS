export const styles = `
  :host {
    display: block;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    max-width: 300px;
    margin: 1rem;
    background-color: #fdfdfd;
    transition: all .3s ease;
    position: relative;
    overflow: hidden;
  }
  :host([data-state="loading"]) { cursor: wait; }
  :host([data-state="loading"])::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
    animation: shimmer 1.5s infinite;
    width: 200%;
    transform: translateX(-100%);
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0%); }
  }
  :host([data-state="error"]) { border-color: #dc2626; background: #fef2f2; }
  :host([data-state="success"][data-user-status="suspended"]) { background: #fff8f8; opacity: .7; }
  :host([data-state="success"][data-user-status="active"]) { background: #f8fff8; }

  user-name, user-email, user-role {
    display: block;
    margin-bottom: .25rem;
    min-height: 1.5em;
  }
  user-name { font-weight: bold; font-size: 1.1rem; }
  user-role::before { content: "Role: "; font-weight: bold; }
  .status-line { font-size: .85rem; color: #666; margin-top: .5rem; }
  .retry { margin-top: .5rem; }
`;
