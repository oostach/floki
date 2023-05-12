'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Todos from './todos'
import Layout from './routes/layout'
import NoMatch from './routes/no-match'

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content')
const link = new HttpLink({ credentials: 'same-origin', headers: { 'X-CSRF-Token': csrfToken } })

const client = new ApolloClient({
  link,
  uri: 'https://floki.dev/graphql/',
  cache: new InMemoryCache()
})

const root = createRoot(document.getElementById('todos-root'))

const routes = createBrowserRouter([
  {
    path: '/todos',
    element: <Layout />,
    children: [
      { path: '/todos/:id', element: <Todos /> },
      { path: '*', element: <NoMatch /> }
    ]
  }
])

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  </ApolloProvider>
)
