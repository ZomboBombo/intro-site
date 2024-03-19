export default class BurgerMenu {
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
        document.addEventListener('click', this.#onClickOutside)
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

    #onClickOutside = (evt) => {
        const notBurger = !(evt.target.closest('[data-burger-menu="burger"]'))
        const notInsideMenu = !(evt.target.closest('[data-burger-menu="menu"]'))
        const isMenuOpened = this.#menu.classList.contains('is-opened')
        const isAllChecksPassed = notBurger && notInsideMenu && isMenuOpened

        if (!isAllChecksPassed) {
            return
        }

        evt.preventDefault()
        this.#changeState()
    }
}
