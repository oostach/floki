import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="album"
export default class extends Controller {
  static targets = ['container', 'image', 'previews', 'preview', 'imageItem', 'autoToggle']

  static template = `
    <div class='album' data-album-target='container' style='display: none;'>
      <div class='album-header'>
        <div class='flex items-center justify-center mr-2' data-controller='tooltip' data-action='mouseenter->tooltip#show mouseleave->tooltip#hide'
          data-tooltip-title-value='Change slides automatically.' data-tooltip-placement-value='left'>
          <input type='checkbox' class='toggle-checkbox' data-album-target='autoToggle' data-action='album#toggleAutoChange' />
        </div>
        <dvi class='album-close-btn' data-action='click->album#closeAlbum'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </dvi>
      </div>
      <div class='album-body'>
        <div class='album-image' data-album-target='image'></div>
        <div class='album-previews' data-album-target='previews'></div>
      </div>
    </div>
  `

  #imagesList = []
  #currentImageIndex = null
  #albumSize = null
  #autoInterval = null

  connect() {
    this.#imagesList.push(...this.#collectImagesParams())
    this.#albumSize = this.#imagesList.length
  }

  openAlbum(event) {
    event.preventDefault()

    if (!this.element.querySelector('.album')) {
      this.#buildAlbum()
    }
    this.#setImage(this.#initialIndex(event.currentTarget))
    this.#showAlbum()
  }

  closeAlbum(event) {
    event.preventDefault()

    document.body.style.removeProperty('overflow')
    this.containerTarget.style.display = 'none'
  }

  toggleAutoChange(e) {
    e.preventDefault()

    if (e.currentTarget.checked) {
      this.#autoInterval = setInterval(() => { this.nextImage() }, 2000)
    } else {
      clearInterval(this.#autoInterval)
    }
  }

  changeImage(event) {
    event.preventDefault()

    const index = event.currentTarget.dataset.imageIndex
    this.#setImage(index)
  }

  nextImage(event = null) {
    if (event) {
      event.preventDefault()
    }

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
      imgOriginal.loading = 'lazy'
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
        const originalImage = this.imageTarget.querySelector('.original-image')
        preview.appendChild(originalImage)
      }

      if (preview.dataset.imageIndex === index) {
        const img = preview.querySelector('.original-image') || preview.querySelector('.preview-image').cloneNode()

        if (img.classList.contains('preview-image') && this.imageTarget.hasChildNodes()) this.imageTarget.innerHTML = ''

        this.imageTarget.appendChild(img)
        this.#currentImageIndex = parseInt(index)
        preview.classList.add('active')
      }
    })
  }

  #showAlbum() {
    this.containerTarget.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }
}
