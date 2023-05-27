import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TodosFilter = ({ filterCompleted }) => {
  const [active, setActive] = useState(false)

  const toggleHidden = (e) => {
    e.preventDefault()
    setActive(prevActive => !prevActive)
    filterCompleted(!active)
  }

  const classList = () => {
    const list = ['todos-filter', 'ml-auto', 'flex', 'content-center', 'flex-wrap', 'text-sm', 'text-sky-700']
    if (active) {
      list.push('underline', 'font-semibold')
    }
    return list.join(' ')
  }

  return (
    <div className={classList()}>
      <a href='#' onClick={toggleHidden}>Non Completed Only</a>
    </div>
  )
}

TodosFilter.propTypes = {
  filterCompleted: PropTypes.func
}

export default TodosFilter
