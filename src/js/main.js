import initBurgerMenu from './modules/init-burger-menu'

document.addEventListener('DOMContentLoaded', () => {
    initBurgerMenu()
})

/*
  В 'load' добавляются скрипты,
  не участвующие в работе первого экрана
*/
window.addEventListener('load', () => {})
