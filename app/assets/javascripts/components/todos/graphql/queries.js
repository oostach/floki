import { gql } from '@apollo/client'
import { TODO_FIELDS } from './fragments'

export const TODOS_LISTS = gql`
  query todosLists {
    todosLists {
      id
      name
    }
  }
`

export const TODO_LIST = gql`
  ${TODO_FIELDS}
  query todosList($id: ID!) {
    todosList(id: $id) {
      id
      name
      todos {
        ...TodoFields
      }
    }
  }
`

export const TODO = gql`
  ${TODO_FIELDS}
  query todo($id: ID!) {
    todo(id: $id) {
      ...TodoFields
    }
  }
`
