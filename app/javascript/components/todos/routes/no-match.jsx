import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      <h2>It looks like you are lost...</h2>
      <p>
        <Link to="/todos">Go to the home page</Link>
      </p>
    </div>
  )
}

export default NoMatch
