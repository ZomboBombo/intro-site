import ColorSchemeSwitcher from '../classes/ColorSchemeSwitcher'

export default function initColorSchemeSwitcher() {
  const $colorSchemeSwitcher = document.querySelector('[data-color-scheme-switcher="parent"]')

  if (!$colorSchemeSwitcher) {
    return
  }

  const colorSchemeSwitcher = new ColorSchemeSwitcher($colorSchemeSwitcher)
  colorSchemeSwitcher.init()
}
