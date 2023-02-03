import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="notes--form"
export default class extends Controller {
  connect() {
  }

  cancel(e) {
    e.preventDefault();

    this.element.remove();
  }
}
