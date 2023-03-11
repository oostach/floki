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

    fetch(this.#addResourcesUrl, {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': this.#csrfToken,
        Accept: 'text/vnd.turbo-stream.html'
      },
      body: filesData
    }).then(res => res.text())
      .then(html => {
        Turbo.renderStreamMessage(html)
        this.#buildFormFields(files)
      })
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

  get #addResourcesUrl() {
    return this.data.element.dataset.addResourcesUrl
  }

  #buildFormFields(files) {
    const filesField = document.createElement('input', { multiple: true, name: 'publication[files][]' })
    filesField.classList.add('hidden')
    filesField.files = files
    this.droppableAreaTarget.append(filesField)
  }
}
