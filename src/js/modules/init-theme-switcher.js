/* eslint-disable arrow-parens */
/* eslint-disable no-new */
/* eslint-disable curly */

export default function initThemeSwitcher() {
    class ThemeSwitcher {
        constructor() {
            this._ts = document.querySelector('[data-theme-switcher]');
            if (!this._ts) return;

            this._tsIndicator = this._ts.querySelector('[data-theme-switcher-indicator]');
            this._tsTriggers = this._ts.querySelectorAll('[data-theme-switcher-trigger]');

            this._onChangeTheme = this._onChangeTheme.bind(this);
            this._tsTriggers.forEach(trigger => trigger.addEventListener('click', this._onChangeTheme));
        }

        _onChangeTheme(evt) {
            evt.preventDefault();

            const prevActiveTrigger = Array.from(this._tsTriggers).find(trigger => trigger.getAttribute('aria-pressed') === 'true');
            prevActiveTrigger.setAttribute('aria-pressed', 'false');
            evt.currentTarget.setAttribute('aria-pressed', 'true');
        }
    }


    /*
        Init of Main Class Logic
    */
    new ThemeSwitcher();
}

