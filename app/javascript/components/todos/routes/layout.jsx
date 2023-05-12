import React from 'react'
import { Link, Outlet } from 'react-router-dom'

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
          data.lists.map(({ id, name }) => {
            return <Link key={id} to={`/todos/${id}`} className='button-primary mr-2'>{name}</Link>
          })
        }
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout
