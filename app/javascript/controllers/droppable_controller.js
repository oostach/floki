import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="flash-messages"
export default class extends Controller {
  static targets = ['droppableArea']

  loadFiles(e) {
    e.preventDefault()

    const filesData = new FormData()
    const files = e.dataTransfer.files
    const csrfToken = document.getElementsByName('csrf-token')[0].content

    for (const file of files) {
      filesData.append('publication[files][]', file)
    }

    for (const pair of filesData.entries()) {
      console.log(pair)
    }

    fetch(this.data.element.dataset.addUrl, {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': csrfToken,
        Accept: 'text/vnd.turbo-stream.html'
      },
      body: filesData
    }).then((success) => {
      console.log(success)
    })
  }

  highlightDroppableArea(e) {
    e.preventDefault()

    this.droppableAreaTarget.classList.add('highlight')
  }

  clearDroppableArea() {
    this.droppableAreaTarget.classList.remove('highlight')
  }
}
