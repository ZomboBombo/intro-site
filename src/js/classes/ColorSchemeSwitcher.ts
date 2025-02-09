interface ISetActiveControlProps {
  controls: HTMLElement[]
  colorScheme: string
}

export default class ColorSchemeSwitcher {
  private switcher: HTMLElement
  private controls: NodeListOf<HTMLElement>

  constructor(colorSchemeSwitcher: HTMLElement) {
    this.switcher = colorSchemeSwitcher

    if (!this.switcher) {
      return
    }

    this.controls = this.switcher.querySelectorAll('[data-color-scheme-switcher="control"]')
  }

  public init(): void {
    const initialColorScheme: string = this.getColorSchemeFromLocalStorage() ?? 'dark'
    this.setColorScheme(initialColorScheme)

    this.controls.forEach((control: HTMLElement) => {
      control.addEventListener('click', this.onClickControl)
    })
  }

  private getColorSchemeFromLocalStorage(): NullishString {
    return localStorage.getItem('color_scheme')
  }

  private saveColorSchemeToLocalStorage(colorScheme: string): void {
    localStorage.setItem('color_scheme', colorScheme)
  }

  private setActiveControl({ controls, colorScheme }: ISetActiveControlProps): void {
    const currActiveControl: UndefinedishHTMLElem = controls.find((control: HTMLElement) => control.classList.contains('is-active'))
    const nextActiveControl: UndefinedishHTMLElem = controls.find((control: HTMLElement) => control.getAttribute('data-color-scheme') === colorScheme)

    currActiveControl?.classList.remove('is-active')
    nextActiveControl?.classList.add('is-active')
  }

  private setColorScheme(colorScheme: string): void {
    const controls: HTMLElement[] = Array.from(this.controls)

    document.documentElement.setAttribute('data-color-scheme', colorScheme)

    this.setActiveControl({ controls, colorScheme })
    this.saveColorSchemeToLocalStorage(colorScheme)
    this.updateOtherSwitchers(colorScheme)
  }

  private updateOtherSwitchers(colorScheme: string): void {
    const switchers: NodeListOf<HTMLElement> = document.querySelectorAll('[data-color-scheme-switcher="parent"]')

    switchers.forEach((switcher: HTMLElement) => {
      const controls: HTMLElement[] = Array.from(switcher.querySelectorAll('[data-color-scheme-switcher="control"]'))
      this.setActiveControl({ controls, colorScheme })
    })
  }

  private onClickControl = (e: MouseEvent): void => {
    e.preventDefault()

    const currControl = e.currentTarget as HTMLElement
    const colorScheme: NullishString = currControl.getAttribute('data-color-scheme')

    colorScheme && this.setColorScheme(colorScheme)
  }
}
