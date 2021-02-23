const { request, response } = require('express')
const db = require('../db')
const loginService = require('../service/loginService')
const Router = require('express-promise-router')
const loginRouter = new Router()

loginRouter.post('/', async (request, response) => {
  console.log('request to api/login\nmethod:', request.method, 'headers:', request.headers, 'body:', request.body)
  
  if (request.body) {
    loginSuccess = await loginService.login(request.body)
    console.log('loginsuccess:', loginSuccess)
    if (loginSuccess === true ) {
      response.status(201).send("Logged in.")
    }  else{
      response.status(401).send()
    }
  } else{
    response.status(400).send()
  }
})

module.exports = loginRouter