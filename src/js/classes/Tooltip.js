export default class Tooltip {
  #tooltip = null
  #position = null

  constructor(tooltip) {
    this.#tooltip = tooltip

    if (!this.#tooltip) {
      return
    }

    this.#position = tooltip.getAttribute('data-tooltip-position') || 'right'
  }

  init() {
    const text = this.#getTooltipText()

    if (!text) {
      return
    }

    this.#setTooltip(text)

    const allyAttrObserver = new MutationObserver(() => {
      const updText = this.#getTooltipText()
      this.#updTooltipText(updText)
    })

    allyAttrObserver.observe(this.#tooltip, {attributes: true})
  }

  #getTooltipText() {
    const allyAttr = this.#tooltip.getAttribute('aria-label') ?? this.#tooltip.getAttribute('title')
    const dataTooltip = this.#tooltip.getAttribute('data-tooltip')

    return allyAttr || dataTooltip
  }

  #setTooltip(text) {
    const tooltipTextElem = document.createElement('span')
    tooltipTextElem.classList.add('tooltip__text')
    tooltipTextElem.setAttribute('data-tooltip-text', '')
    tooltipTextElem.textContent = text

    const computedPosition = window.getComputedStyle(this.#tooltip)['position']
    const isPositionAllow = computedPosition === 'static' || computedPosition === 'relative'

    this.#tooltip.appendChild(tooltipTextElem)
    this.#tooltip.classList.add('tooltip')
    isPositionAllow && this.#tooltip.classList.add('tooltip--pos-relative')

    switch (this.#position) {
      case 'top':
        this.#tooltip.classList.add('tooltip--top')
        break

      case 'bottom':
        this.#tooltip.classList.add('tooltip--bottom')
        break

      case 'left':
        this.#tooltip.classList.add('tooltip--right')
        break

      case 'right':
      default:
        this.#tooltip.classList.add('tooltip--left')
    }

    const hasTitleAttr = this.#tooltip.hasAttribute('title')
    hasTitleAttr && this.#tooltip.removeAttribute('title')
  }

  #updTooltipText(text) {
    const currTooltipTextElem = this.#tooltip.querySelector('[data-tooltip-text]')
    currTooltipTextElem.textContent = text
  }
}
