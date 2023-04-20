'use strict'

import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="tags-filter"
export default class extends Controller {
  static targets = ['tagItem']

  connect() {
  }

  filter(e) {
    const tagCheckbox = e.target
    const tagLabel = tagCheckbox.closest('label.tag')

    if (tagCheckbox.checked) {
      tagLabel.classList.add('marked')
    } else {
      tagLabel.classList.remove('marked')
    }
  }
}
