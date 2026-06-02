/** main.js
 * Entry point for the components-and-decomposition lesson.
 *
 * Note: we use ONE delegated listener for all debug-log events
 * (callback to lesson 02 — event delegation). The listener routes
 * by event.detail.source rather than attaching a separate listener
 * per component.
 */

import '../components/theme-picker/theme-picker.js';
import '../components/lang-picker/lang-picker.js';
import '../components/article-viewer/article-viewer.js';
import '../components/debug-log/debug-log.js';

document.addEventListener('DOMContentLoaded', () => {
    const debugLog = document.querySelector('debug-log');

    // ONE listener handles all debug-log events from all components.
    document.body.addEventListener('debug-log', (event) => {
        debugLog.addEntry(event.detail);
    });

    console.log(`Application ready @ ${new Date().toISOString()}`);
});
