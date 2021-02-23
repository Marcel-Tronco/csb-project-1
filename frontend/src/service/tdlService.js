//import React from 'react'
import axios from 'axios'
var dbList= ['total', 'fail']

const getAll = async () => {
  try {
    const response = await axios.get(`${process.env.PUBLIC_URL}/api/todos`)
    console.log(response.data)
    if (response.data) {
      return response.data
    } else{
      return ( dbList )
    }
  } catch (error) {
    console.log(error)
    return dbList
  }
}

const addOne = async (tdlString) => {
  try {
    const putRes = await axios.post(`${process.env.PUBLIC_URL}/api/todos`, { tdlE: tdlString })
    return putRes.data.tdlE
  } catch (exception) {
    console.log(exception)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addOne }