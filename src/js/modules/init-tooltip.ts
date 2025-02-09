import Tooltip from '../classes/Tooltip'

export default function initTooltip() {
  const $tooltips: NodeListOf<HTMLElement> = document.querySelectorAll('[data-tooltip]')

  $tooltips.forEach((tooltipElem: HTMLElement) => {
    const tooltip = new Tooltip(tooltipElem)
    tooltip.init()
  })
}
