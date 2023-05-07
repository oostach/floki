import { gql } from '@apollo/client'

export const todoList = gql`
  query {
    todosList(id: 1) {
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
