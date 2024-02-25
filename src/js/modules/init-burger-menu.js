export default function initBurgerMenu() {
    const $burgerMenu = document.querySelector('[data-burger-menu="menu"]')
    const $burger = document.querySelector('[data-burger-menu="burger"]')

    if (!$burgerMenu || !$burger) {
        return
    }

    class BurgerMenu {
        #menu = null
        #burger = null

        constructor({burgerMenu, burger}) {
            this.#menu = burgerMenu
            this.#burger = burger
        }

        init() {
            const resetMq = window.matchMedia('(max-width: 1023px)')

            this.#burger.addEventListener('click', this.#onClickBurger)
            this.#menu.addEventListener('click', this.#onCLickInsideMenu)

            resetMq.addEventListener('change', this.#onResetState)
        }

        #changeState() {
            const isOpened = this.#burger.getAttribute('aria-pressed') === 'true'

            this.#menu.classList.toggle('is-opened', !isOpened)
            this.#burger.setAttribute('aria-pressed', !isOpened)
        }

        #onResetState = () => {
            this.#menu.setAttribute('style', 'transition: unset')

            this.#menu.classList.remove('is-opened')
            this.#burger.setAttribute('aria-pressed', 'false')

            setTimeout(() => this.#menu.removeAttribute('style'), 0)
        }

        #onClickBurger = (evt) => {
            evt.preventDefault()
            this.#changeState()
        }

        #onCLickInsideMenu = (evt) => {
            const isLink = typeof evt.target.closest('[data-burger-menu="link]') !== 'undefined'

            if (!isLink) {
                evt.preventDefault()
                return
            }

            this.#changeState()
        }
    }

    const burgerMenu = new BurgerMenu({
        burgerMenu: $burgerMenu,
        burger: $burger
    })

    burgerMenu.init()
}
