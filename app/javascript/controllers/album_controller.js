import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="album-messages"
export default class extends Controller {
  static targets = ['imageContainer', 'mainImage', 'albumHolder', 'albumContainer']

  static values = {
    images: Array
  }

  connect() {
    this.imagesValue = this.imageContainerTargets.map(target => { return { imageUrl: target.dataset.imageUrl, imageIndex: target.dataset.imageIndex } })
    this.albumHolderTarget.prepend(this.#buildAlbum(this.imagesValue))
  }

  openAlbum(event) {
    event.preventDefault()

    const currentIndex = this.#currentIndex(event.currentTarget)
    this.mainImageTarget.innerHTML = this.#getMainImage(currentIndex)
    this.albumHolderTarget.classList.toggle('hidden', false)
    document.querySelector('body').style.overflow = 'hidden'
  }

  #currentIndex(target) {
    return target.closest('.image').dataset.imageIndex
  }

  #getMainImage(currentIndex) {
    const previews = this.albumHolderTarget.querySelectorAll('.preview-item')
    let mainImage  = null
    for (const preview of previews.values()) {
      if (preview.dataset.imageIndex === currentIndex) {
        mainImage = preview.innerHTML
      }
    }
    return mainImage
  }

  #buildImage(imageData) {
    const preview = document.createElement('div')
    preview.classList.add('preview-item')
    preview.dataset.imageIndex = imageData.imageIndex
    const img = new Image()
    img.src = imageData.imageUrl
    preview.appendChild(img)
    return preview
  }

  #buildAlbum(imagesData) {
    const albumContainer = document.createElement('div')
    albumContainer.classList.add('album')
    albumContainer.dataset.albumTarget = 'albumContainer'
    albumContainer.innerHTML = '<div class="album-image" data-album-target="mainImage"></div><div class="album-previews"></div>'
    const previewsContainer = albumContainer.querySelector('.album-previews')
    imagesData.forEach(image => { previewsContainer.appendChild(this.#buildImage(image)) })
    return albumContainer
  }
}
