'use strict'

import { Controller } from '@hotwired/stimulus'
import { Turbo } from '@hotwired/turbo-rails'

// Connects to data-controller="search-form"
export default class extends Controller {
  connect() {
  }

  search(e) {
    e.preventDefault()
    const searchForm = e.target.closest('form')

    Turbo.navigator.submitForm(searchForm)
  }
}
