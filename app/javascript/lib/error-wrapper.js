'use strict'

export const wrapWithError = (field, message) => {
  const errorNode = createErrorNode(message)
  const inputWrapper = wrapInput(field)

  inputWrapper.appendChild(errorNode)
}

export const clearErrors = (field) => {
  const inputWrapper = field.closest('.field-with-errors')

  if (inputWrapper) {
    const errorNode = inputWrapper.querySelector('.field-errors')

    inputWrapper.classList.remove('field-with-errors')
    errorNode.remove()
  }
}

const createErrorNode = (message) => {
  const errorContainer = document.createElement('span')

  errorContainer.classList.add('field-errors')
  errorContainer.textContent = message
  return errorContainer
}

const wrapInput = (field) => {
  const wrapper = field.closest('.form-group')

  wrapper.classList.add('field-with-errors')
  wrapper.appendChild(field)
  return wrapper
}
