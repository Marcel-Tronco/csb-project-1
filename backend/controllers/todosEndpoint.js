const { request, response } = require('express')
const db = require('../db')
const tdlService = require('../service/todoService')
const Router = require('express-promise-router')
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
  if (request.body 
    && request.body.tdlE 
    && typeof request.body.tdlE === 'string'
  ) {
    var tdlString = request.body.tdlE
    if (tdlString.length > 140) {
      tdlString = tdlString.substring(0, 139)
      console.warn('Warning: Input String to long input. Truncated the string.')
    }
    tdlService.addTodo(tdlString)
    tdlData = tdlData.concat(request.body.tdlE)
    response.status(201).send({tdlE: request.body.tdlE})
  } else{tdlData = tdlData.concat(request.body.tdlE)
        response.status(400).send()
  }
})

module.exports = todoRouter