import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="main-menu"
export default class extends Controller {
  static targets = ['menuList']

  connect() {
  }

  hide(event) {
    if (window.matchMedia('(min-width: 639px)').matches) return
    if (this.#is_clicked_on_element(event) || this.#is_clicked_inside_element(event)) return

    this.menuListTarget.style.display = 'none'
  }

  show(event) {
    event.preventDefault()

    this.menuListTarget.style.display = 'block'
  }

  #is_clicked_inside_element(event) {
    return this.element.contains(event.target)
  }

  #is_clicked_on_element(event) {
    return this.element === event.target
  }
}
