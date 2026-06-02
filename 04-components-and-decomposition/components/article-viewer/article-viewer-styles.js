export const styles = `
    :host {
        display: block;
        max-width: var(--content-width, min(90%, 65ch));
        margin: 0 auto;
        padding: var(--size-5) var(--size-3);
    }
    
    header {
        position: static;
        background: none;
        border: none;
        padding: 0;
        margin-bottom: var(--size-4);
    }
    
    h1 {
        color: var(--text-1);
        font-size: var(--font-size-4);
        margin: 0;
    }

    article {
        background-color: var(--surface-2);
        padding: var(--size-4);
        border-radius: var(--radius-3);
        box-shadow: var(--shadow-2);
    }

    p {
        margin: 0 0 var(--size-3) 0;
        color: var(--text-2);
    }

    p:last-child {
        margin-bottom: 0;
    }

    /* RTL Support */
    :host-context([dir="rtl"]) {
        text-align: right;
    }
`; 
