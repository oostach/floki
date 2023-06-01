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

  #leftPlacementOffset(elementSize, tooltipSize) {
    return {
      x: Math.round(elementSize.left - tooltipSize.width - 5) + 'px',
      y: Math.round(elementSize.top + window.scrollY + (elementSize.height - tooltipSize.height) / 2) + 'px'
    }
  }

  #rightPlacementOffset(elementSize, tooltipSize) {

  }

  #bottomPlacementOffset(elementSize, tooltipSize) {
    return {
      x: Math.round(elementSize.top - tooltipSize.height + window.scrollY - 5) + 'px',
      y: Math.round(elementSize.left + (elementSize.width - tooltipSize.width) / 2) + 'px'
    }
  }

  #topPlacementOffset(elementSize, tooltipSize) {
    return {
      x: elementSize.left + (elementSize.width - tooltipSize.width) / 2 + 'px',
      y: elementSize.top - tooltipSize.height + window.scrollY - 5 + 'px'
    }
  }

  #tooltipOffsets() {
    const elementSize = this.element.getBoundingClientRect()
    const tooltipSize = this.#tooltip.getBoundingClientRect()

    switch (this.placementValue) {
      case 'left':
        return this.#leftPlacementOffset(elementSize, tooltipSize)
      case 'right':
        return this.#rightPlacementOffset(elementSize, tooltipSize)
      case 'bottom':
        return this.#bottomPlacementOffset(elementSize, tooltipSize)
      default:
        return this.#topPlacementOffset(elementSize, tooltipSize)
    }
  }

  show() {
    this.#tooltip = this.#buildTooltip()
    this.element.before(this.#tooltip)

    const tooltipOffsets = this.#tooltipOffsets()
    this.#tooltip.style.top = tooltipOffsets.y
    this.#tooltip.style.left = tooltipOffsets.x
  }

  hide() {
    this.#tooltip.remove()
  }
}
