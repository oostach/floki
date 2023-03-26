'use strict'

import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="form"
export default class extends Controller {
  connect() {
  }

  cancel(e) {
    this.element.remove()
  }
}
