import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="album-messages"
export default class extends Controller {
  static targets = ['container', 'image', 'previews', 'preview', 'imageItem']

  static template = `
    <div class='album' data-album-target='container' style='display: none;'>
      <dvi class='album-close-btn' data-action='click->album#closeAlbum'>X</dvi>
      <div class='album-image' data-album-target='image'></div>
      <div class='album-previews' data-album-target='previews'></div>
    </div>
  `

  #imagesList = []

  connect() {
    this.#imagesList.push(...this.#collectImagesParams())
    this.#buildAlbum()
  }

  openAlbum(event) {
    event.preventDefault()

    this.#setImage(this.#initialIndex(event.currentTarget))
    this.#showAlbum()
  }

  closeAlbum(event) {
    event.preventDefault()

    document.body.style.removeProperty('overflow')
    this.containerTarget.style.display = 'none'
  }

  changeImage(event) {
    event.preventDefault()

    const index = event.currentTarget.dataset.imageIndex
    this.#setImage(index)
  }

  #initialIndex(target) {
    return target.closest('.image').dataset.index
  }

  #collectImagesParams() {
    return this.imageItemTargets.map(target => { return { url: target.dataset.url, index: target.dataset.index } })
  }

  #htmlTemplate() {
    const parser = new DOMParser()
    const textTemplate = this.constructor.template.replace(/\s+(?=<)|(?<=>)\s+/gm, '')
    return parser.parseFromString(textTemplate, 'text/html').querySelector('.album')
  }

  #buildPreviewItem({ url, index }) {
    const img = new Image()
    img.src = url

    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('preview-item')
    imageWrapper.dataset.action = 'click->album#changeImage'
    imageWrapper.dataset.imageIndex = index
    imageWrapper.dataset.albumTarget = 'preview'
    imageWrapper.appendChild(img)
    return imageWrapper
  }

  #buildAlbum() {
    const album = this.#htmlTemplate()
    const previews = album.querySelector('.album-previews')

    this.#imagesList.forEach(imageItem => previews.appendChild(this.#buildPreviewItem(imageItem)))
    this.element.prepend(album)
  }

  #setImage(index) {
    this.previewTargets.forEach(preview => {
      preview.classList.remove('active')

      if (preview.dataset.imageIndex === index) {
        this.imageTarget.replaceChildren(preview.querySelector('img').cloneNode())
        preview.classList.add('active')
      }
    })
  }

  #showAlbum() {
    this.containerTarget.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  }
}
