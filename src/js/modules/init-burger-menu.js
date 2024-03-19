import BurgerMenu from '../classes/BurgerMenu'

export default function initBurgerMenu() {
    const $burgerMenu = document.querySelector('[data-burger-menu="menu"]')
    const $burger = document.querySelector('[data-burger-menu="burger"]')

    if (!$burgerMenu || !$burger) {
        return
    }

    const burgerMenu = new BurgerMenu({
        burgerMenu: $burgerMenu,
        burger: $burger
    })

    burgerMenu.init()
}
