/* eslint-disable no-unused-expressions */
/* eslint-disable no-new */
/* eslint-disable curly */
export default function initBurgerMenu() {
    const $burger = document.querySelector('[data-burger-menu-trigger]');
    const $burgerMenu = document.querySelector('[data-burger-menu-navigation-main-block]');
    if (!$burger || !$burgerMenu) return;

    class BurgerMenu {
        static CNST_TIMEOUT_CHANGE_STATE = 200;

        constructor(burger, burgerMenu) {
            this._burger = burger;
            this._burgerMenu = burgerMenu;

            this._BurgerStateAriaMessage = {
                _menuIsOpened: $burger.dataset.burgerMenuStateIsOpened,
                _menuIsClosed: $burger.dataset.burgerMenuStateIsClosed,
            };

            this._onBurgerClick = this._onBurgerClick.bind(this);
            this._onOuterClick = this._onOuterClick.bind(this);

            this._burger.addEventListener('click', this._onBurgerClick);
        }

        _updateBurgerMenu() {
            const isBurgerActive = this._burger.dataset.burgerMenuTrigger === 'is-active';

            if (isBurgerActive) {
                this._burger.dataset.burgerMenuTrigger = 'is-default';
                this._burger.setAttribute('aria-label', this._BurgerStateAriaMessage._menuIsClosed);
                setTimeout(() => this._burger.setAttribute('aria-pressed', 'false'), BurgerMenu.CNST_TIMEOUT_CHANGE_STATE);
                this._changeBurgerMenuState()._toClosed();
            } else {
                this._burger.dataset.burgerMenuTrigger = 'is-active';
                this._burger.setAttribute('aria-label', this._BurgerStateAriaMessage._menuIsOpened);
                this._burger.setAttribute('aria-pressed', 'true');

                this._changeBurgerMenuState()._toOpened();
            }
        }

        _changeBurgerMenuState() {
            /**
             * POSSIBLE PROGRESSIVE IMPROVEMENTS:
             * ---
             * Add logic of "clearTimeout" — when the User
             * clicks on the Burger-button too often.
             */
            return {
                _toOpened: () => {
                    this._burgerMenu.dataset.burgerMenuNavigationMainBlock = 'is-pending';
                    setTimeout(() => (this._burgerMenu.dataset.burgerMenuNavigationMainBlock = 'is-active'), BurgerMenu.CNST_TIMEOUT_CHANGE_STATE);
                    this._burgerMenu.addEventListener('click', this._onOuterClick);
                },
                _toClosed: () => {
                    this._burgerMenu.dataset.burgerMenuNavigationMainBlock = 'is-pending';
                    setTimeout(() => (this._burgerMenu.dataset.burgerMenuNavigationMainBlock = ''), BurgerMenu.CNST_TIMEOUT_CHANGE_STATE);
                    this._burgerMenu.removeEventListener('click', this._onOuterClick);
                },
            };
        }

        _onOuterClick(evt) {
            evt.preventDefault();

            const isNotBurgerMenu = !evt.target.hasAttribute('data-burger-menu-navigation-box') && !evt.target.closest('[data-burger-menu-navigation-box]');
            isNotBurgerMenu && this._updateBurgerMenu();
        }

        // *** Handler: for clicks on the Burger ***
        _onBurgerClick(evt) {
            evt.preventDefault();
            this._updateBurgerMenu();
        }
    }


    /*
        Init of Main Class Logic
    */
    new BurgerMenu($burger, $burgerMenu);
}
