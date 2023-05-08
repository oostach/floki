import { gql } from '@apollo/client'

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!, $status: Boolean!) {
    toggleTodo(input: { id: $id, status: $status }) {
      todo {
        id
        title
        completed
      }
    }
  }
`
