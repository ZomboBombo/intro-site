import Tooltip from "../classes/Tooltip"

export default function initTooltip() {
  const tooltips = document.querySelectorAll('[data-tooltip]')

  tooltips.forEach((tooltipElem) => {
    const tooltip = new Tooltip(tooltipElem)
    tooltip.init()
  })
}
