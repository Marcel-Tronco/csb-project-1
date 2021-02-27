//import React from 'react'
import axios from 'axios'
var dbList= [
  {
    description: 'total',
    duedate: (new Date(2021, 3, 20, 12, 0)).toDateString(),
    author: 'admin',
    peopleinvolved: ['user']
  },
  {
    description: 'fail',
    duedate: (new Date(2019, 3, 20, 12, 0)).toDateString(),
    author: 'user',
    peopleinvolved: ['admin']
  }
]

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
    return dbList
  }
}

const addOne = async (todo) => {
  try {
    const putRes = await axios.post(`${process.env.PUBLIC_URL}/api/todos`, todo )
    return putRes.data
  } catch (exception) {
    console.log(exception)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addOne }