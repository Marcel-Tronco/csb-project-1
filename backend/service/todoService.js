const db = require('../db')
const initialTodos = ['todo1', 'todo2']
const tableName = 'todotable'
const columnName = 'todostr'

const logAdditionRes = (err, res) => {
  if (err) {
    console.log('Error while adding to db', err)
  } else {
    console.log('Adding to db succeded', res)
  }
}

const initializeTable = () => {
  console.log('start initialization of the table')
  db.query(`CREATE TABLE ${tableName} (${columnName} VARCHAR(140))`, [], (err, res) => {
    if (err) {
      console.log('Error:', err)
    } else{
      initialTodos.forEach((todo) => { 
        db.query(`INSERT INTO ${tableName} VALUES ('${todo}');`, 
          [], 
          logAdditionRes)
      })
    }
  })
}

const retryStartup = () => {
  console.log('retryStartup: not implemented yet')
}

const onStartUp = () => {
  //check if todo table exists
  console.log('doing start up - todo-table.')
  db.query(`SELECT EXISTS ( SELECT FROM pg_tables WHERE  tablename  = 'todotable'
  )`, [], (err, res) => {
    if (err) {
      console.log(err)
      retryStartup()
    } else {
      if (! res.rows[0].exists ) {
        initializeTable()
      } else{
        console.log('Tablecheck done.')
      }
    }
  })
}

onStartUp()

const getTodos = async () => {
  console.log('get todos from db\n db-password:', process.env.PGPASSWORD)
  try {
    console.log(process.env.PGPASSWORD)
    const { rows } = await db.syncquery(`SELECT ${columnName} FROM ${tableName}`)
    const tdl = rows.map((row) => row[`${columnName}`])
    console.log('tdl', tdl) 
    return tdl
  } catch (error) {
    console.log('get todos error:', error)
  }

}

const addTodo = (todoStr) => {
  if (!todoStr || typeof todoStr !== 'string') {
      console.log('Error: invalid input:', todoStr)
      return // possibly add error handling sometime
    }

  console.log('blab')
  db.query(`INSERT INTO ${tableName} VALUES ('${todoStr}')`, [], logAdditionRes)
  console.log('blab')

}


module.exports = { getTodos, addTodo }