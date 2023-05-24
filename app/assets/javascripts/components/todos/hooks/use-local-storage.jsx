'use strict'

import { useState, useEffect } from 'react'

const useLocalStorage = (key, initState) => {
  const [value, setValue] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(key)
      return localValue ? JSON.parse(localValue) : initState
    } catch (err) {
      console.log(err)
      return initState
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
