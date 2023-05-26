import React from 'react'
import { Link, Outlet, Navigate } from 'react-router-dom'

import Loader from '../loader'

import { useQuery } from '@apollo/client'
import { TODOS_LISTS } from '../graphql/queries'

const Layout = () => {
  const { loading, data } = useQuery(TODOS_LISTS)

  if (loading) return <Loader />

  return (
    <div className='todos-lists'>
      <nav className='mb-4'>
        {
          data.todosLists.map(({ id, name }) => {
            return <Link key={id} to={`/${id}`} className='button-primary mr-2'>{name}</Link>
          })
        }
      </nav>
      <Outlet />
      <Navigate to={`/${data.todosLists[0].id}`} />
    </div>
  )
}

export default Layout
