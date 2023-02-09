import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="flash-messages"
export default class extends Controller {
  connect() {
    const autohide = this.element.dataset.hasOwnProperty('autohide');

    if (autohide) {
      const self = this;
      setTimeout(function(){
        self.close();
      }, 3000)
    }
  }

  close(e) {
    if (typeof e === 'object') {
      e.preventDefault();
    }

    this.element.classList.add('opacity-0');
    this.element.addEventListener('transitionend', (event) => { event.target.remove() });
  }
}
