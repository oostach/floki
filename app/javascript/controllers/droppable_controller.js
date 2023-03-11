import { Controller } from '@hotwired/stimulus'
import { Turbo } from '@hotwired/turbo-rails'

// Connects to data-controller="flash-messages"
export default class extends Controller {
  static targets = ['droppableArea']

  uploadOrPreviewFiles(e) {
    e.preventDefault()

    const filesData = new FormData()
    const files = e.dataTransfer.files

    for (const file of files) {
      filesData.append('publication[files][]', file)
    }

    fetch(this.#addUrl, {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': this.#csrfToken,
        Accept: 'text/vnd.turbo-stream.html'
      },
      body: filesData
    }).then(res => res.text())
      .then(html => Turbo.renderStreamMessage(html))
  }

  highlightDroppableArea(e) {
    e.preventDefault()

    this.droppableAreaTarget.classList.add('highlight')
  }

  clearDroppableArea() {
    this.droppableAreaTarget.classList.remove('highlight')
  }

  get #csrfToken() {
    return document.getElementsByName('csrf-token')[0].content
  }

  get #addUrl() {
    return this.data.element.dataset.addUrl
  }
}
