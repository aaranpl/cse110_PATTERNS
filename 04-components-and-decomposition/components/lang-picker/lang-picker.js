import { template } from './lang-picker-template.js';
import { styles } from './lang-picker-styles.js';
import { translations, supportedLanguages } from './lang-picker-i18n.js';

/**
 * @class LangPicker
 * @extends HTMLElement
 * @description A component that allows users to switch between different languages
 * @fires debug-log - Emits debug information about component actions
 */
class LangPicker extends HTMLElement {
    static get observedAttributes() {
        return ['lang'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.storedLang = localStorage.getItem('patterns:04:lang');
        
        // Create observer to watch for language changes
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
            ${template(this.translations, supportedLanguages)}
        `;

        this.select = this.shadowRoot.querySelector('select');
        this.select.value = this.lang;
        this.select.addEventListener('change', this.handleLangChange.bind(this));

        this.logDebug('render', 'Component rendered', {
            currentLang: this.lang,
            label: this.translations.label
        });
    }

    connectedCallback() {
        // Start observing document for language changes
        this.observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang']
        });

        // Set initial language if stored
        if (this.storedLang) {
            document.documentElement.setAttribute('lang', this.storedLang);
            const direction = ['ar'].includes(this.storedLang) ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', direction);
        }
        
        this.render();
        this.logDebug('connected', 'Component connected to DOM', {
            storedLang: this.storedLang,
            browserLang: navigator.language,
            finalLang: this.lang,
            label: this.translations.label
        });
    }

    disconnectedCallback() {
        // Stop observing when component is removed
        this.observer.disconnect();
        this.logDebug('disconnected', 'Component removed from DOM');
    }

    handleLangChange(e) {
        const oldLang = this.lang;
        const newLang = e.target.value;
        
        localStorage.setItem('patterns:04:lang', newLang);
        this.storedLang = newLang;
        
        document.documentElement.setAttribute('lang', newLang);
        
        const direction = ['ar'].includes(newLang) ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', direction);

        this.logDebug('language-change', 'Language changed by user', {
            from: oldLang,
            to: newLang,
            direction,
            stored: true,
            label: this.translations.label
        });
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
                source: 'lang-picker',
                type,
                message,
                data
            }
        }));
    }
}

customElements.define('lang-picker', LangPicker); 
