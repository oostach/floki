import { Controller } from '@hotwired/stimulus'
import { Turbo } from '@hotwired/turbo-rails'

// Connects to data-controller="flash-messages"
export default class extends Controller {
  static targets = ['droppableArea', 'filesField', 'imagesPreviewArea']

  static values = {
    resourcesUrl: String,
    imageTemplate: String,
    uploadable: Boolean
  }

  uploadOrPreviewFiles(e) {
    e.preventDefault()

    const files = e.dataTransfer.files

    this.uploadableValue ? this.#uploadFiles(files) : this.#previewFiles(files)
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

  #buildFormFields(files) {
    const fileField = document.createElement('input')
    fileField.setAttribute('type', 'file')
    fileField.setAttribute('name', 'publication[files][]')
    fileField.setAttribute('class', 'hidden')
    fileField.files = files
    this.element.appendChild(fileField)
  }

  #previewFiles(files) {
    for (const file of files) {
      file.type.match(/^image\//)
        ? this.#previewImage(file)
        : this.#previewFile(file)
    }
    this.#buildFormFields(files)
  }

  #previewImage(file) {
    const parser = new DOMParser()
    const htmlDoc = parser.parseFromString(this.imageTemplateValue, 'text/html')
    htmlDoc.querySelector('.image-name').innerText = file.name
    htmlDoc.querySelector('.image-preview').src = URL.createObjectURL(file)
    this.imagesPreviewAreaTarget.append(htmlDoc.querySelector('.image'))
  }

  #previewFile() {

  }

  #uploadFiles(files) {
    const filesData = new FormData()

    for (const file of files) {
      filesData.append('publication[files][]', file)
    }

    fetch(this.resourcesUrlValue, {
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
      })
  }
}
