'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import Todos from './todos'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content')
const link = new HttpLink({ credentials: 'same-origin', headers: { 'X-CSRF-Token': csrfToken } })

const client = new ApolloClient({
  link,
  uri: 'https://floki.dev/graphql/',
  cache: new InMemoryCache()
})

const root = createRoot(document.getElementById('todos-root'))

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Todos />
    </React.StrictMode>
  </ApolloProvider>
)
