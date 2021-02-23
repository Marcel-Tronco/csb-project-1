//import React from 'react'
import axios from 'axios'

const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${process.env.PUBLIC_URL}/api/login`, { username, password })
    if (response.status === 201) {
      sessionStorage.setItem('login', 'true')
      return true
    } else {
      sessionStorage.removeItem('login')
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }