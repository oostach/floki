import { gql } from '@apollo/client'

export const TODO_FIELDS = gql`
  fragment TodoFields on Todo {
    id
    title
    date
    time
    completed
    position
  }
`
