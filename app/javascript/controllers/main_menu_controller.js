import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="main-menu"
export default class extends Controller {
  static targets = ['menuList']

  connect() {
  }

  resize() {
    if (window.matchMedia('(min-width: 639px)').matches) {
      this.menuListTarget.classList.remove('menu-visible')
    }
  }

  hide(event) {
    if (window.matchMedia('(min-width: 639px)').matches) return
    if (this.#is_clicked_on_element(event) || this.#is_clicked_inside_element(event)) return

    this.menuListTarget.classList.remove('menu-visible')
  }

  show(event) {
    event.preventDefault()

    this.menuListTarget.classList.add('menu-visible')
  }

  #is_clicked_inside_element(event) {
    return this.element.contains(event.target)
  }

  #is_clicked_on_element(event) {
    return this.element === event.target
  }
}
