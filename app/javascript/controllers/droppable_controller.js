import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="flash-messages"
export default class extends Controller {
  static targets = ['droppableArea']

  track(e) {
    e.preventDefault()
  }

  loadFiles(e) {
    e.preventDefault()

    const form =  document.querySelector('.publication-form form')
    const formData = new FormData(form)
    const filesData = new FormData()
    const files = e.dataTransfer.files

    // debugger

    for (const pair of filesData.entries()) {
      console.log(pair)
    }
  }

  highlightDroppableArea(e) {
    e.preventDefault()

    this.droppableAreaTarget.classList.add('highlight')
  }

  clearDroppableArea() {
    this.droppableAreaTarget.classList.remove('highlight')
  }
}
