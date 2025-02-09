interface IAllyTooltipTextProps {
  openTxt: UndefNullishString
  closeTxt: UndefNullishString
}

export default class Sidebar {
  private sidebar: HTMLElement
  private parent: NullishHTMLElem
  private trigger: NullishButton
  private allyTooltipText: IAllyTooltipTextProps

  constructor(sidebar: HTMLElement) {
    this.sidebar = sidebar

    if (!this.sidebar) {
      return
    }

    this.parent = this.sidebar.closest('[data-sidebar="parent"]') as NullishHTMLElem
    this.trigger = this.sidebar.querySelector('[data-sidebar="trigger"]') as NullishButton

    this.allyTooltipText = {
      openTxt: this.trigger?.getAttribute('data-sidebar-text-open'),
      closeTxt: this.trigger?.getAttribute('data-sidebar-text-close')
    }
  }

  public init(): void {
    this.trigger?.addEventListener('click', this.onClickTrigger)
  }

  private setSidebarGapForSite(): void {
    const sidebarWidth = this.sidebar.offsetWidth

    document.documentElement.style.setProperty('--js-sidebar-width', `${sidebarWidth}px`)
    this.parent?.classList.add('is-sidebar-open')

    this.updAllyTooltipText('to-close')
  }

  private resetSidebarGapForSite(): void {
    document.documentElement.style.setProperty('--js-sidebar-width', '0px')
    this.parent?.classList.remove('is-sidebar-open')

    this.updAllyTooltipText('to-open')
  }

  private updAllyTooltipText(state: string): void {
    const { openTxt, closeTxt } = this.allyTooltipText

    if (!this.trigger || !openTxt || !closeTxt) {
      return
    }

    const hasTitleAttr = this.trigger.getAttribute('title')
    const hasAriaLabelAttr = this.trigger.getAttribute('aria-label')

    hasTitleAttr && this.trigger.setAttribute('title', state === 'to-open' ? openTxt : closeTxt)
    hasAriaLabelAttr && this.trigger.setAttribute('aria-label', state === 'to-open' ? openTxt : closeTxt)
  }

  private onClickTrigger = (e: MouseEvent | Event): void => {
    e.preventDefault()

    const wasSidebarOpen: boolean = this.sidebar.classList.contains('is-open')
    this.sidebar.classList.toggle('is-open', !wasSidebarOpen)

    wasSidebarOpen
      ? this.resetSidebarGapForSite()
      : this.setSidebarGapForSite()
  }
}
