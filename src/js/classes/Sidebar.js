export default class Sidebar {
  #parent = null
  #sidebar = null
  #trigger = null
  #allyTooltipText = null

  constructor(sidebar) {
    this.#sidebar = sidebar

    if (!this.#sidebar) {
      return
    }

    this.#parent = this.#sidebar.closest('[data-sidebar="parent"]')
    this.#trigger = this.#sidebar.querySelector('[data-sidebar="trigger"]')

    this.#allyTooltipText = {
      openTxt: this.#trigger.getAttribute('data-sidebar-text-open'),
      closeTxt: this.#trigger.getAttribute('data-sidebar-text-close')
    }
  }

  init() {
    this.#trigger.addEventListener('click', this.#onClickTrigger)
  }

  #setSidebarGapForSite() {
    const sidebarWidth = this.#sidebar.offsetWidth

    document.documentElement.style.setProperty('--js-sidebar-width', `${sidebarWidth}px`)
    this.#parent?.classList.add('is-sidebar-open')

    this.#updAllyTooltipText('to-close')
  }

  #resetSidebarGapForSite() {
    document.documentElement.style.setProperty('--js-sidebar-width', '0px')
    this.#parent?.classList.remove('is-sidebar-open')

    this.#updAllyTooltipText('to-open')
  }

  #updAllyTooltipText(state) {
    const {openTxt, closeTxt} = this.#allyTooltipText

    if (!openTxt || !closeTxt) {
      return
    }

    const hasTitleAttr = this.#trigger.getAttribute('title')
    const hasAriaLabelAttr = this.#trigger.getAttribute('aria-label')

    hasTitleAttr && this.#trigger.setAttribute('title', state === 'to-open' ? openTxt : closeTxt)
    hasAriaLabelAttr && this.#trigger.setAttribute('aria-label', state === 'to-open' ? openTxt : closeTxt)
  }

  #onClickTrigger = (evt) => {
    evt.preventDefault()

    const wasSidebarOpen = this.#sidebar.classList.contains('is-open')
    this.#sidebar.classList.toggle('is-open', !wasSidebarOpen)

    if (wasSidebarOpen) {
      this.#resetSidebarGapForSite()
    } else {
      this.#setSidebarGapForSite()
    }
  }
}
