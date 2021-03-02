const express = require('express')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const pictureRouter = require('./controllers/pictureEndpoint')
const todoRouter = require('./controllers/todosEndpoint')
const loginRouter = require('./controllers/loginEndpoint')
const db = require('./db')
const app = express()
db.initialize()

app.use(express.json())

app.use(db.session)
app.use('/api/picture.jpg', pictureRouter)
app.use('/api/todos', todoRouter)
app.use('/api/login', loginRouter)




app.use(express.static('dist'))

const server = http.createServer(app)
const PORT = config.PORT



server.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
})