'use strict'

import { Controller } from '@hotwired/stimulus'
import { Turbo } from '@hotwired/turbo-rails'

// Connects to data-controller="tags-filter"
export default class extends Controller {
  static targets = ['tagItem']

  connect() {
  }

  filter(e) {
    const tagCheckbox = e.target
    const tagLabel = tagCheckbox.closest('label.tag')
    const filterForm = tagCheckbox.closest('form')

    if (tagCheckbox.checked) {
      tagLabel.classList.add('marked')
    } else {
      tagLabel.classList.remove('marked')
    }

    Turbo.navigator.submitForm(filterForm)
  }
}
