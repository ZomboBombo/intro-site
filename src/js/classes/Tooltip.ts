export default class Tooltip {
  private tooltip: HTMLElement
  private position: string

  constructor(tooltip: HTMLElement) {
    this.tooltip = tooltip

    if (!this.tooltip) {
      return
    }

    this.position = tooltip.getAttribute('data-tooltip-position') || 'right'
  }

  public init(): void {
    const text: NullishString = this.getTooltipText()

    if (!text) {
      return
    }

    this.setTooltip(text)

    const allyAttrObserver = new MutationObserver(() => {
      const updText: string = this.getTooltipText()!
      this.updTooltipText(updText)
    })

    allyAttrObserver.observe(this.tooltip, { attributes: true })
  }

  private getTooltipText(): NullishString {
    const allyAttr: NullishString = this.tooltip.getAttribute('aria-label') ?? this.tooltip.getAttribute('title')
    const dataTooltip: NullishString = this.tooltip.getAttribute('data-tooltip')

    return allyAttr || dataTooltip
  }

  private setTooltip(text: string): void {
    const tooltipTextElem: HTMLElement = document.createElement('span')
    tooltipTextElem.classList.add('tooltip__text')
    tooltipTextElem.setAttribute('data-tooltip-text', '')
    tooltipTextElem.textContent = text

    const computedPosition: string = window.getComputedStyle(this.tooltip)['position']
    const isPositionAllow: boolean = computedPosition === 'static' || computedPosition === 'relative'

    this.tooltip.appendChild(tooltipTextElem)
    this.tooltip.classList.add('tooltip')
    isPositionAllow && this.tooltip.classList.add('tooltip--pos-relative')

    this.tooltip.classList.add(`tooltip--${this.position}`)

    const hasTitleAttr: boolean = this.tooltip.hasAttribute('title')
    hasTitleAttr && this.tooltip.removeAttribute('title')
  }

  private updTooltipText(text: string): void {
    const currTooltipTextElem = this.tooltip.querySelector('[data-tooltip-text]') as NullishHTMLElem
    currTooltipTextElem && (currTooltipTextElem.textContent = text)
  }
}
