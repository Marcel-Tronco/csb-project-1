const { request, response } = require('express')
const db = require('../db')
const loginService = require('../service/loginService')
const Router = require('express-promise-router')
const loginRouter = new Router()

loginRouter.post('/', async (request, response) => {
  console.log('request to api/login\nmethod:', request.method, 'headers:', request.headers, 'body:', request.body)
  
  if (request.body) {
    loginResult = await loginService.login(request.body)
    if (loginResult.success) {
      request.session.loggedin = true
      request.session.logindate = Date.now()
      request.session.username = loginResult.username
    }
    returnStatus = loginResult.success? 201 : 401
    response.status(returnStatus).send(JSON.stringify(loginResult))
  } else{
    response.status(400).send()
  }
})

module.exports = loginRouter