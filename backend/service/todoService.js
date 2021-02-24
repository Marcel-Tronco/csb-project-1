const db = require('../db')

const getTodos = async () => {
  console.log('get todos from db\n db-password:', process.env.PGPASSWORD)
  try {
    const { rows } = await db.syncquery(`SELECT * FROM ${db.todoAdresseesTableModel.tableName}`)
    console.log('get Todos rows:', rows) 
    return rows
  } catch (error) {
    console.log('get todos error:', error)
  }
}

const addTodo = (todo) => {
  db.addTodo(todo)
}


module.exports = { getTodos, addTodo }