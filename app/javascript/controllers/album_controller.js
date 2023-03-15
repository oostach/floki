import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="album-messages"
export default class extends Controller {
  static targets = ['imageContainer']

  static values = {
    images: Array
  }

  connect() {
    this.imagesValue = this.imageContainerTargets.map(target => { return { imageUrl: target.dataset.imageUrl, imageIndex: target.dataset.imageIndex } })
  }

  openAlbum(event) {
    event.preventDefault()

    const currentIndex = this.#currentIndex(event.currentTarget)
    debugger
  }

  #currentIndex(target) {
    return target.closest('.image').dataset.imageIndex
  }

  #buildImage(imageData) {
    const img = new Image()
    img.src = imageData.imageUrl
    return img
  }

  #buildAlbum(images) {
    const albumContainer = document.createElement('div')
    albumContainer.classList.add('album')
  }
}
