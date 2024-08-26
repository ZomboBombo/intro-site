import initBurgerMenu from './modules/init-burger-menu'
import initSidebar from './modules/init-sidebar'
import initTooltip from './modules/init-tooltip'

document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu()
  initSidebar()
  initTooltip()
})

/*
  В 'load' добавляются скрипты,
  не участвующие в работе первого экрана
*/
window.addEventListener('load', () => { })
