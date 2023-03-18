import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="album"
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
  #currentImageIndex = null
  #albumSize = null

  connect() {
    this.#imagesList.push(...this.#collectImagesParams())
    this.#albumSize = this.#imagesList.length
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

  nextImage(event) {
    event.preventDefault()

    const firstIndex = '0'
    const nextIndex = this.#currentImageIndex + 1
    nextIndex >= this.#albumSize ? this.#setImage(firstIndex) : this.#setImage(nextIndex.toString())
  }

  previousImage(event) {
    event.preventDefault()

    const nextIndex = this.#currentImageIndex - 1
    const lastIndex = this.#albumSize - 1
    nextIndex < 0 ? this.#setImage(lastIndex.toString()) : this.#setImage(nextIndex.toString())
  }

  #initialIndex(target) {
    return target.closest('.image').dataset.index
  }

  #collectImagesParams() {
    return this.imageItemTargets.map(target => { return { url: target.dataset.url, index: target.dataset.index, previewUrl: target.dataset.previewUrl } })
  }

  #htmlTemplate() {
    const parser = new DOMParser()
    const textTemplate = this.constructor.template.replace(/\s+(?=<)/gm, '').trim()
    return parser.parseFromString(textTemplate, 'text/html').querySelector('.album')
  }

  #buildPreviewItem({ url, index, previewUrl }) {
    const imgPreview = new Image()
    const imageWrapper = document.createElement('div')

    imageWrapper.classList.add('preview-item')
    imageWrapper.dataset.action = 'click->album#changeImage'
    imageWrapper.dataset.imageIndex = index
    imageWrapper.dataset.albumTarget = 'preview'

    if (previewUrl) {
      const imgOriginal = new Image()

      imgPreview.src = previewUrl
      imgOriginal.src = url
      imgOriginal.classList.add('original-image')
      imgOriginal.dataset.index = index
      imageWrapper.appendChild(imgOriginal)
    } else {
      imgPreview.src = url
    }

    imgPreview.classList.add('preview-image')
    imageWrapper.prepend(imgPreview)
    return imageWrapper
  }

  #buildAlbum() {
    const album = this.#htmlTemplate()
    const previews = album.querySelector('.album-previews')

    this.#imagesList.forEach(imageItem => {
      previews.appendChild(this.#buildPreviewItem(imageItem))
    })

    this.element.prepend(album)
  }

  #setImage(index) {
    const currentOriginalIndex = this.imageTarget.querySelector('.original-image')?.dataset.index

    this.previewTargets.forEach(preview => {
      preview.classList.remove('active')

      if (preview.dataset.imageIndex === currentOriginalIndex) {
        preview.appendChild(this.imageTarget.querySelector('.original-image'))
      }

      if (preview.dataset.imageIndex === index) {
        const img = preview.querySelector('.original-image')
          ? preview.querySelector('.original-image')
          : preview.querySelector('.preview-image').cloneNode()

        this.imageTarget.appendChild(img)
        this.#currentImageIndex =  parseInt(index)
        preview.classList.add('active')
      }
    })
  }

  #showAlbum() {
    this.containerTarget.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  }
}
