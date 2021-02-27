const { request, response } = require('express')
const db = require('../db')
const tdlService = require('../service/todoService')
const Router = require('express-promise-router')
const { sanitTdleData } = require('../utils/inputsanitation')
var tdlData = [
  { 
    description: 'fail1',
    duedate: new Date(2021, 3, 20, 12, 0),
    author: "admin",
    peopleinvolved: ["user"]
  },
  { 
    description: 'fail2',
    duedate: new Date(2019, 3, 20, 12, 0),
    author: "user",
    peopleinvolved: ["admin"]
  }
]
const todoRouter = new Router()

todoRouter.get('/', async (request, response) => {
  console.log('reached the get route of todoRouter')
  const tdlDbData = await tdlService.getAllTodos()
  console.log('tdlDbData:', tdlDbData)
  response.json( tdlDbData || tdlData )
})

todoRouter.post('/', (request, response) => {
  console.log(`request to api/todos\nmethod: ${JSON.stringify(request.method)}\nheaders: ${JSON.stringify(request.headers)}\nbody: ${JSON.stringify(request.body)}`)
  const requestData = request.body ? sanitTdleData(request.body) : false
  try {
    if ( requestData ) {
      tdlService.addTodo(requestData)
      response.status(201).send({tdlE: requestData})
    } else{
      response.status(400).send()
    }
  } catch (error) {
    console.log(error)
    response.status(400).send()
  }

})

module.exports = todoRouter