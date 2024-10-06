/**
 * [TODO]:
 * 
 * 1) Добавить логику сохранения стейта
 * выбранной 'color-scheme' в 'local-storage';
 * 
 * 2) Добавить логику предпроверки на выбранную
 * ранее 'color-scheme';
*/

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
    this.#controls.forEach((control) => {
      control.addEventListener('click', this.#onClickControl)
    })
  }

  #setActiveControl(control) {
    const currActiveControl = Array.from(this.#controls).find((control) => control.classList.contains('is-active'))

    currActiveControl.classList.remove('is-active')
    control.classList.add('is-active')
  }

  #onClickControl = (evt) => {
    evt.preventDefault()

    const currControl = evt.currentTarget

    const colorScheme = currControl.getAttribute('data-color-scheme')
    document.documentElement.setAttribute('data-color-scheme', colorScheme)

    this.#setActiveControl(currControl)
  }
}
