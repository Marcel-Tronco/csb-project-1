const db = require('../db')

const getAllQuery = `SELECT 
todos.author,
todos.description, 
todos.duedate, 
todoadressees.adressee_id AS peopleinvolved
FROM todos
LEFT JOIN todoadressees ON todos.id = todoadressees.todo_id`

const getAllTodos = async () => {
  console.log('get todos from db\n db-password:', process.env.PGPASSWORD)
  try {
    const { rows } = await db.syncquery(getAllQuery)
    console.log('get Todos rows:', rows) 
    return rows
  } catch (error) {
    console.log('get todos error:', error)
  }
}

const addTodo = (todo) => {
  db.addTodo(todo)
}


module.exports = { getAllTodos, addTodo }