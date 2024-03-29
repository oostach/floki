const updateUIPosition = ({ currentTarget }) => {
  currentTarget.querySelectorAll('.todo-position').forEach((item, index) => item.value = index)
}

const pasteItem = (id, currentTarget) => {
  const movingItem = document.querySelector(`#${id}.moving-todo`)
  const placeholders = currentTarget.querySelectorAll('.copy-todo')

  if (placeholders.length !== 1) {
    return
  }

  currentTarget.replaceChild(movingItem, placeholders[0])
  movingItem.classList.remove('moving-todo')
}

const collectIds = (element) => {
  return Array.from(element.querySelectorAll('.todo-checkbox')).map(node => node.getAttribute('id'))
}

const removePlaceholder = ({ currentTarget }) => {
  currentTarget.querySelectorAll('.copy-todo').forEach(clone => clone.remove())
}

const createPlaceholder = (movingTodo) => {
  const clone = movingTodo.cloneNode(true)
  clone.classList.add('copy-todo', 'border', 'opacity-50', 'bg-sky-100', 'rounded-lg')
  clone.classList.remove('moving-todo')
  return clone
}

const calculateElementMiddle = (element) => {
  return element.offsetTop + element.clientHeight / 2
}

const shouldHighlightIt = (activeTodo, movingTodo) => activeTodo && movingTodo.getAttribute('id') !== activeTodo.getAttribute('id')

const renderPlaceholder = (event, activeTodo, movingTodo) => {
  const movingCopy = createPlaceholder(movingTodo)
  const activeMiddle = calculateElementMiddle(activeTodo)

  if (event.clientY < activeMiddle) {
    const prevEl = activeTodo.previousSibling
    if (prevEl.classList.contains('copy-todo')) {
      return
    }

    removePlaceholder(event)
    activeTodo.before(movingCopy)
  } else {
    removePlaceholder(event)
    activeTodo.after(movingCopy)
  }
}

const handleDragover = (e) => {
  e.preventDefault()

  const activeTodo = e.target.closest('.todo-item')
  const movingTodo = e.currentTarget.querySelector('.moving-todo')

  if (shouldHighlightIt(activeTodo, movingTodo)) {
    renderPlaceholder(e, activeTodo, movingTodo)
  }
}

const handleDrop = (e, positionUpdater, listParams) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'

  const [movingId, ...pastOrderIds] = e.dataTransfer.getData('text').split(',')
  pasteItem(movingId, e.currentTarget)
  updateUIPosition(e)

  const currentOrderIds = collectIds(e.currentTarget)
  if (JSON.stringify(currentOrderIds) !== JSON.stringify(pastOrderIds)) {
    positionUpdater({ variables: { ids: currentOrderIds, ...listParams } })
  }
}

const handleDrag = (e) => {
  const parentElement = e.currentTarget.parentElement
  const listIds = collectIds(parentElement)
  const data = [e.currentTarget.getAttribute('id'), ...listIds].join(',')

  e.currentTarget.classList.add('moving-todo')
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text', data)
}

const handleDragEnd = (e) => removePlaceholder(e)

export { handleDrag, handleDragover, handleDrop, handleDragEnd }
