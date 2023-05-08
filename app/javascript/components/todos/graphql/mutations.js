import { gql } from '@apollo/client'

export const TOGGLE_TODO = gql`
  mutation toggleTodo($id: ID!, $completed: Boolean!) {
    toggleTodo(id: $id, status: $completed) {
      id
      title
      completed
    }
  }
`
