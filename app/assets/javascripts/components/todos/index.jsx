'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Todos from './views/todos'
import Layout from './views/layout'
import NoMatch from './views/no-match'

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
    path: '/',
    element: <Layout />,
    children: [
      { path: '/:id', element: <Todos /> },
      { path: '*', element: <NoMatch /> }
    ]
  }
], { basename: '/todos' })

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  </ApolloProvider>
)
