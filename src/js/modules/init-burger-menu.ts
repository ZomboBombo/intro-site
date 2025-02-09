import BurgerMenu from '../classes/BurgerMenu'

export default function initBurgerMenu(): void {
  const $burgerMenu: NullishHTMLElem = document.querySelector('[data-burger-menu="menu"]')
  const $burger: NullishHTMLElem = document.querySelector('[data-burger-menu="burger"]')

  if (!$burgerMenu || !$burger) {
    return
  }

  const burgerMenu = new BurgerMenu({
    burgerMenu: $burgerMenu,
    burger: $burger
  })

  burgerMenu.init()
}
