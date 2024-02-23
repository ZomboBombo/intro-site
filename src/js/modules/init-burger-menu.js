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

            this.#burger.addEventListener('click', this.#onBurgerClick)
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

        #onBurgerClick = (evt) => {
            evt.preventDefault()
            this.#changeState()
        }
    }

    const burgerMenu = new BurgerMenu({
        burgerMenu: $burgerMenu,
        burger: $burger
    })

    burgerMenu.init()
}
