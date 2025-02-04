export default class ColorSchemeSwitcher {
  #switcher = null
  #controls = null

  constructor(colorSchemeSwitcher) {
    this.#switcher = colorSchemeSwitcher

    if (!this.#switcher) {
      return
    }

    this.#controls = this.#switcher.querySelectorAll('[data-color-scheme-switcher="control"]')
  }

  init() {
    const initialColorScheme = this.#getColorSchemeFromLocalStorage() ?? 'dark'
    this.#setColorScheme(initialColorScheme)

    this.#controls.forEach((control) => {
      control.addEventListener('click', this.#onClickControl)
    })
  }

  #getColorSchemeFromLocalStorage() {
    return localStorage.getItem('color_scheme')
  }

  #saveColorSchemeToLocalStorage(colorScheme) {
    localStorage.setItem('color_scheme', colorScheme)
  }

  #setActiveControl({controls, colorScheme}) {
    const currActiveControl = controls.find((control) => control.classList.contains('is-active'))
    const nextActiveControl = controls.find((control) => control.getAttribute('data-color-scheme') === colorScheme)

    currActiveControl.classList.remove('is-active')
    nextActiveControl.classList.add('is-active')
  }

  #setColorScheme(colorScheme) {
    const controls = Array.from(this.#controls)

    document.documentElement.setAttribute('data-color-scheme', colorScheme)

    this.#setActiveControl({controls, colorScheme})
    this.#saveColorSchemeToLocalStorage(colorScheme)
    this.#updateOtherSwitchers(colorScheme)
  }

  #updateOtherSwitchers(colorScheme) {
    const switchers = document.querySelectorAll('[data-color-scheme-switcher="parent"]')

    switchers.forEach((switcher) => {
      const controls = Array.from(switcher.querySelectorAll('[data-color-scheme-switcher="control"]'))
      this.#setActiveControl({controls, colorScheme})
    })
  }

  #onClickControl = (evt) => {
    evt.preventDefault()

    const currControl = evt.currentTarget
    const colorScheme = currControl.getAttribute('data-color-scheme')

    this.#setColorScheme(colorScheme)
  }
}
