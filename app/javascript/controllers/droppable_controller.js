import { Controller } from '@hotwired/stimulus'
import { Turbo } from '@hotwired/turbo-rails'
import { pngCssIcon } from '../file-types'

// Connects to data-controller="flash-messages"
export default class extends Controller {
  static targets = ['droppableArea', 'filesField', 'imagesPreviewArea', 'filesPreviewArea']

  static values = {
    resourcesUrl: String,
    imageTemplate: String,
    fileTemplate: String,
    uploadable: Boolean
  }

  deletePreview(e) {
    e.preventDefault()

    e.currentTarget.closest('.image, .file').remove()
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

  #buildFormFields(file) {
    const fileField = document.createElement('input')
    const list = new DataTransfer()
    list.items.add(file)

    fileField.setAttribute('type', 'file')
    fileField.setAttribute('name', 'publication[files][]')
    fileField.setAttribute('class', 'hidden')
    fileField.files = list.files
    return fileField
  }

  #previewFiles(files) {
    for (const file of files) {
      file.type.match(/^image\//)
        ? this.#previewImage(file)
        : this.#previewFile(file)
    }
  }

  #previewImage(file) {
    const parser = new DOMParser()
    const htmlDoc = parser.parseFromString(this.imageTemplateValue, 'text/html')
    const previewContainer = htmlDoc.querySelector('.image')

    previewContainer.querySelector('.image-name').innerText = file.name
    previewContainer.querySelector('.image-preview').src = URL.createObjectURL(file)
    previewContainer.appendChild(this.#buildFormFields(file))
    this.imagesPreviewAreaTarget.append(previewContainer)
  }

  #previewFile(file) {
    const parser = new DOMParser()
    const htmlDoc = parser.parseFromString(this.fileTemplateValue, 'text/html')
    const previewContainer = htmlDoc.querySelector('.file')
    const icon = pngCssIcon(file)

    previewContainer.querySelector('.file-icon').append(icon)
    previewContainer.querySelector('.file-link').prepend(file.name)
    previewContainer.querySelector('.file-size').innerText = `(${(file.size / 1024).toFixed(3)} Kb)`
    previewContainer.appendChild(this.#buildFormFields(file))
    this.filesPreviewAreaTarget.append(previewContainer)
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
