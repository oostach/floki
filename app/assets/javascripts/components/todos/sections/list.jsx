'use strict'

import React, { useState } from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import TodosFilter from './filter'
import { UPDATE_POSITION } from '../graphql/mutations'
import { handleDragover, handleDrop, handleDragEnd } from '../utils/draggable'

const TodoList = ({ items, list, enableEditMode }) => {
  const [hidden, setHidden] = useState(false)
  const [sort, setSort] = useState('unsorted')

  const [updatePosition] = useMutation(UPDATE_POSITION, {
    update(cache, { data }) {
      const { todos } = data.updatePosition
      cache.modify({
        id: cache.identify({ __typename: 'TodosList', id: list.id }),
        fields: {
          todos() { return [...todos] }
        }
      })
    }
  })

  const filterCompleted = hiddenState => setHidden(hiddenState)

  const sortedItems = () => {
    if (sort === 'latest') {
      return items.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    } else if (sort === 'recent') {
      return items.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    } else {
      return items.sort((a, b) => a.position - b.position)
    }
  }

  return (
    <div className='todos-list mt-4 pb-2' onDragOver={handleDragover} onDrop={(e) => handleDrop(e, updatePosition, { listId: list.id })} onDragEnd={handleDragEnd}>
      <div className='flex content-center mb-2 flex-wrap'>
        <div className='todos-list-name font-semibold text-lg text-sky-900'>{list.name}</div>
        <TodosFilter filterCompleted={filterCompleted} sortTodos={(state) => setSort(prevSort => state)} />
      </div>
      {
        sortedItems().map(item => {
          return <TodoItem key={item.id} item={item} listId={list.id} enableEditMode={enableEditMode} hidden={item.completed && hidden} />
        })
      }
    </div>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  list: PropTypes.object.isRequired,
  enableEditMode: PropTypes.func
}

export default TodoList
