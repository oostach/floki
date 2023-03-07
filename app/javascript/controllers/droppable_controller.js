import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="flash-messages"
export default class extends Controller {
  static targets = ['droppableArea']

  track(e) {
    e.preventDefault()
  }

  loadFiles(e) {
    e.preventDefault()
  }

  highlightDroppableArea(e) {
    e.preventDefault()

    this.droppableAreaTarget.classList.add('highlight')
  }

  clearDroppableArea() {
    this.droppableAreaTarget.classList.remove('highlight')
  }
}
