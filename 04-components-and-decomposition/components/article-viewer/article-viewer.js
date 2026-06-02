import { template } from './article-viewer-template.js';
import { styles } from './article-viewer-styles.js';
import { translations } from './article-viewer-i18n.js';

/**
 * @class ArticleViewer
 * @extends HTMLElement
 * @description A component that displays article content with internationalization support
 * @fires debug-log - Emits debug information about component actions
 */
class ArticleViewer extends HTMLElement {
    static get observedAttributes() {
        return ['lang'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Create an observer to watch for language changes
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    this.render();
                }
            });
        });
    }

    get lang() {
        return document.documentElement.lang || 'en';
    }

    get translations() {
        return translations[this.lang] || translations.en;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            ${template(this.translations)}
        `;

        this.logDebug('render', 'Component rendered', {
            currentLang: this.lang,
            title: this.translations.title
        });
    }

    connectedCallback() {
        // Start observing the document for language changes
        this.observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });
        
        this.render();
        this.logDebug('connected', 'Component connected to DOM', {
            browserLang: navigator.language,
            finalLang: this.lang,
            title: this.translations.title
        });
    }

    disconnectedCallback() {
        // Stop observing when the component is removed from the DOM tree
        this.observer.disconnect();
        this.logDebug('disconnected', 'Component removed from DOM');
    }

    /**
     * @private
     * @param {string} type - The type of debug event
     * @param {string} message - The debug message
     * @param {Object} [data] - Optional data to include in the log
     */
    logDebug(type, message, data = null) {
        this.dispatchEvent(new CustomEvent('debug-log', {
            bubbles: true,
            composed: true,
            detail: {
                source: 'article-viewer',
                type,
                message,
                data
            }
        }));
    }
}

customElements.define('article-viewer', ArticleViewer); 
