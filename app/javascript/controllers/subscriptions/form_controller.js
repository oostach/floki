import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="subscriptions--form"
export default class extends Controller {
  connect() {
  }

  hide(event) {
    if (this.#is_clicked_on_element(event) || this.#is_clicked_inside_element(event)) return

    this.element.remove()
  }

  #is_clicked_inside_element(event) {
    return this.element.contains(event.target)
  }

  #is_clicked_on_element(event) {
    return this.element === event.target
  }
}
