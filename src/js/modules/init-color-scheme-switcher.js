import ColorSchemeSwitcher from '../classes/ColorSchemeSwitcher'

export default function initColorSchemeSwitcher() {
  const $colorSchemeSwitchers = document.querySelectorAll('[data-color-scheme-switcher="parent"]')

  $colorSchemeSwitchers.forEach((csSwitcher) => {
    const colorSchemeSwitcher = new ColorSchemeSwitcher(csSwitcher)
    colorSchemeSwitcher.init()
  })
}
