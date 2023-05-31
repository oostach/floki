import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="tooltip"
export default class extends Controller {
  static values = {
    title: String,
    placement: String
  }

  #tooltip = null

  #tooltipClassList() {
    const classList = ['tooltip']

    if (['top', 'left', 'right', 'bottom'].includes(this.placementValue)) {
      classList.push(`tooltip-${this.placementValue}`)
    } else {
      classList.push('tooltip-top')
    }
    return classList
  }

  #buildTooltip() {
    const tooltipWrapper = document.createElement('div')
    tooltipWrapper.classList.add(...this.#tooltipClassList())
    tooltipWrapper.innerText = this.titleValue
    return tooltipWrapper
  }

  #leftPlacementOffset() {

  }

  #rightPlacementOffset() {

  }

  #bottomPlacementOffset() {

  }

  #topPlacementOffset() {
    const elementSize = this.element.getBoundingClientRect()
    const tooltipSize = this.#tooltip.getBoundingClientRect()

    return {
      x: elementSize.top - tooltipSize.height + window.scrollY - 5 + 'px',
      y: elementSize.left + (elementSize.width - tooltipSize.width) / 2 + 'px'
    }
  }

  #tooltipOffsets() {
    switch (this.placementValue) {
      case 'left':
        return this.#leftPlacementOffset()
      case 'right':
        return this.#rightPlacementOffset()
      case 'bottom':
        return this.#bottomPlacementOffset()
      default:
        return this.#topPlacementOffset()
    }
  }

  show() {
    this.#tooltip = this.#buildTooltip()
    this.element.before(this.#tooltip)
    const tooltipOffsets = this.#tooltipOffsets()
    this.#tooltip.style.top = tooltipOffsets.x
    this.#tooltip.style.left = tooltipOffsets.y
  }

  hide() {
    this.#tooltip.remove()
  }
}
