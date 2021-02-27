//import React from 'react'
import axios from 'axios'

const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${process.env.PUBLIC_URL}/api/login`, { username, password })
    if (response.status === 201) {
      return username
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }