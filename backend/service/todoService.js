const db = require('../db')

const getAllQuery = `SELECT 
todos.author,
todos.description, 
todos.duedate, 
todoadressees.adressee_id AS peopleinvolved
FROM todos
LEFT JOIN todoadressees ON todos.id = todoadressees.todo_id`

const getUserRelatedTodosQuery = (username) => {
  return `SELECT 
  todos.author,
  todos.description, 
  todos.duedate, 
  todoadressees.adressee_id AS peopleinvolved
  FROM todos
  LEFT JOIN todoadressees ON todos.id = todoadressees.todo_id
  WHERE todoadressees.adressee_id='${username}' OR todos.author='${username}'`
}

const getAllTodos = async () => {
    try {
    const { rows } = await db.syncquery(getAllQuery)
    console.log('get Todos rows:', rows) 
    return rows
  } catch (error) {
    console.log('get todos error:', error)
  }
}

const getUserRelatedTodos = async (username) => {
  try {
    const { rows } = await db.syncquery(getUserRelatedTodosQuery(username))
    console.log('get Todos rows:', rows) 
    return rows
  } catch (error) {
    console.log('get todos error:', error)
  }
}

const addTodo = (todo) => {
  db.addTodo(todo)
}


module.exports = { getAllTodos, addTodo, getUserRelatedTodos}