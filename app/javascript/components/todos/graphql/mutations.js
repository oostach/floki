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

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $listId: ID!) {
    createTodo(input: { title: $title, listId: $listId }) {
      todo {
        id
        title
        completed
      }
    }
  }
`
