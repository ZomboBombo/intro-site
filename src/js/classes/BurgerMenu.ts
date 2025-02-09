interface IBurgerMenuProps {
  burgerMenu: HTMLElement
  burger: HTMLElement
}

export default class BurgerMenu {
  private menu: HTMLElement
  private burger: HTMLElement

  constructor({ burgerMenu, burger }: IBurgerMenuProps) {
    this.menu = burgerMenu
    this.burger = burger
  }

  public init(): void {
    const resetMq: MediaQueryList = window.matchMedia('(max-width: 1023px)')

    this.burger.addEventListener('click', this.onClickBurger)
    this.menu.addEventListener('click', this.onCLickInsideMenu)

    resetMq.addEventListener('change', this.onResetState)
    document.addEventListener('click', this.onClickOutside)
  }

  private changeState(): void {
    const isOpened: boolean = this.burger.getAttribute('aria-pressed') === 'true'

    this.menu.classList.toggle('is-opened', !isOpened)
    this.burger.setAttribute('aria-pressed', `${!isOpened}`)
  }

  private onResetState = (): void => {
    this.menu.setAttribute('style', 'transition: unset')

    this.menu.classList.remove('is-opened')
    this.burger.setAttribute('aria-pressed', 'false')

    setTimeout(() => this.menu.removeAttribute('style'))
  }

  private onClickBurger = (e: MouseEvent): void => {
    e.preventDefault()
    this.changeState()
  }

  private onCLickInsideMenu = (e: MouseEvent): void => {
    const _target = e.target as HTMLElement
    const isLink: boolean = typeof _target.closest('[data-burger-menu="link]') !== 'undefined'

    if (!isLink) {
      e.preventDefault()
      return
    }

    this.changeState()
  }

  private onClickOutside = (e: MouseEvent): void => {
    const _target = e.target as HTMLElement

    const notBurger: boolean = !(_target.closest('[data-burger-menu="burger"]'))
    const notInsideMenu: boolean = !(_target.closest('[data-burger-menu="menu"]'))
    const isMenuOpened: boolean = this.menu.classList.contains('is-opened')
    const isAllChecksPassed: boolean = notBurger && notInsideMenu && isMenuOpened

    if (!isAllChecksPassed) {
      return
    }

    e.preventDefault()
    this.changeState()
  }
}
