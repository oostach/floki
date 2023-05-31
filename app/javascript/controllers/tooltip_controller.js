import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="tooltip"
export default class extends Controller {
  static values = {
    title: String
  }

  #tooltip = null

  #buildTooltip() {
    const tooltipWrapper = document.createElement('div')
    tooltipWrapper.classList.add('tooltip')
    tooltipWrapper.innerText = this.titleValue
    return tooltipWrapper
  }

  show() {
    const elementSize = this.element.getBoundingClientRect()
    this.#tooltip = this.#buildTooltip()
    this.element.before(this.#tooltip)
    const tooltipSize = this.#tooltip.getBoundingClientRect()
    this.#tooltip.style.top = (elementSize.top - elementSize.height - 5) + 'px'
    this.#tooltip.style.left = elementSize.left + (elementSize.width - tooltipSize.width) / 2 + 'px'
  }

  hide() {
    this.#tooltip.remove()
  }
}
