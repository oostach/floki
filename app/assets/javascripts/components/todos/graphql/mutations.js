import { gql } from '@apollo/client'
import { TODO_FIELDS } from './fragments'

export const TOGGLE_TODO = gql`
  ${TODO_FIELDS}
  mutation ToggleTodo($id: ID!, $status: Boolean!) {
    toggleTodo(input: { id: $id, status: $status }) {
      todo {
        ...TodoFields
      }
    }
  }
`

export const CREATE_TODO = gql`
  ${TODO_FIELDS}
  mutation CreateTodo($title: String!, $listId: ID!) {
    createTodo(input: { title: $title, listId: $listId }) {
      todo {
        ...TodoFields
      }
    }
  }
`

export const UPDATE_TODO = gql`
  ${TODO_FIELDS}
  mutation UpdateTodo($id: ID!, $listId: ID!, $title: String!) {
    updateTodo(input: { id: $id, listId: $listId, title: $title }) {
      todo {
        ...TodoFields
      }
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!, $listId: ID!) {
    deleteTodo(input: { id: $id, listId: $listId }) {
      id
    }
  }
`

export const UPDATE_POSITION = gql`
  ${TODO_FIELDS}
  mutation UpdatePosition($ids: [ID!]!, $listId: ID!) {
    updatePosition(input: { ids: $ids, listId: $listId } ) {
      todos {
        ...TodoFields
      }
    }
  }
`
