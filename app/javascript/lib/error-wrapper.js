'use strict'

export const wrapWithError = (field, message) => {
  const errorNode = createErrorNode(message)
  const inputWrapper = wrapInput(field)

  inputWrapper.appendChild(errorNode)
}

const createErrorNode = (message) => {
  const errorContainer = document.createElement('span')

  errorContainer.classList.add('field-errors')
  errorContainer.textContent = message
  return errorContainer
}

const wrapInput = (field) => {
  const wrapper = document.createElement('div')

  wrapper.classList.add('field-with-errors')
  field.parentNode.insertBefore(wrapper, field)
  wrapper.appendChild(field)
  return wrapper
}
