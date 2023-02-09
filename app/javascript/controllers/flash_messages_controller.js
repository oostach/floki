import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="notes--form"
export default class extends Controller {
  connect() {
  }

  close(e) {
    e.preventDefault();

    this.element.remove();
  }
}
