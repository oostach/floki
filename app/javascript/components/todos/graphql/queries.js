import { gql } from '@apollo/client'

export const TODO_LIST = gql`
  query todosList($id: ID!) {
    todosList(id: $id) {
      id
      name
      todos {
        id
        title
        completed
      }
    }
  }
`

export const todo = gql`
  query todo($id: ID!) {
    todo(id: $id) {
      id
      title
      completed
    }
  }
`
