import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

const TodosFilter = ({ filterCompleted, sortTodos }) => {
  const [active, setActive] = useState(false)
  const [quickest, setQuickest] = useState('unsorted')

  useEffect(() => {
    filterCompleted(active)
  }, [active])

  const sortByDue = (e) => {
    e.preventDefault()

    if (quickest === 'latest') {
      setQuickest(prevQuickest => 'recent')
      sortTodos('recent')
    } else if (quickest === 'recent') {
      setQuickest(prevQuickest => 'unsorted')
      sortTodos('unsorted')
    } else {
      setQuickest(prevQuickest => 'latest')
      sortTodos('latest')
    }
  }

  const classList = (enabled) => {
    const list = []
    if (enabled) {
      list.push('underline', 'font-semibold')
    }
    return list.join(' ')
  }

  return (
    <div className='todos-filter ml-auto flex content-center flex-wrap text-sm text-sky-700'>
      <a href='#' onClick={sortByDue} className={'mr-3 ' + classList(quickest !== 'unsorted')}>
        { quickest === 'latest' && <ArrowDownIcon width={'16px'} className='inline-block mr-1' /> }
        { quickest === 'recent' && <ArrowUpIcon width={'16px'} className='inline-block mr-1' /> }
        Sort by Date
      </a>
      <a href='#' onClick={(e) => { e.preventDefault(); setActive(prevActive => !prevActive) }} className={classList(active)}>Non Completed Only</a>
    </div>
  )
}

TodosFilter.propTypes = {
  filterCompleted: PropTypes.func,
  sortTodos: PropTypes.func
}

export default TodosFilter
