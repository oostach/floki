import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="flash-messages"
export default class extends Controller {
  static autohideTimeout = 3000;

  connect() {
    if (this.element.dataset.hasOwnProperty('autohide')) {
      this.autohide();
    }
  }

  autohide() {
    const self = this;
    setTimeout(function () {
      self.close();
    }, this.constructor.autohideTimeout);
  }

  close(e) {
    if (typeof e === 'object') {
      e.preventDefault();
    }

    this.element.classList.add('opacity-0');
    this.element.addEventListener('transitionend', (event) => { event.target.remove() });
  }
}
