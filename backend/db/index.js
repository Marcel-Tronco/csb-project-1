const { response } = require('express')
const { Pool } = require('pg')
const pool = new Pool(/*{
    user: 'user',
    host: 'pp-db-svc.main-ns',
    database: 'pp-db',
    password: 'example',
    port: 5432,
}*/)

class Column {
  constructor(columnName, dataType) {
    this.columnName = columnName
    this.dataType = dataType
  }
}

class TableModel {
  constructor(tableName, columns){
    this.tableName = tableName
    this.columns = columns
  }

}

const userTableModel = new TableModel(
  'users',
  [
    new Column('username', 'varchar(30) primary key'),
    new Column('password', 'varchar')
  ]
  )

const todoAdresseesTableModel = new TableModel (
  "todoadressees",
  [
    new Column("todo_id",  'integer references todos(id)'),
    new Column("addressee_id", 'integer references users(username)'),
    new Column('id', 'serial primary key'),
  ]
)

const todoTableModel = new TableModel(
  'todos',
  [
    new Column('author', 'varchar(30) references users(username)'),
    new Column('description', 'varchar(140)'),
    new Column('duedate', 'timestamp'),
    new Column('id', 'serial primary key')
  ]
)

const initialUsers = [ 
  {username: 'admin', password: 'admin'}, 
  {username: 'user', password: 'user'}
]

const initialTodos = [
  { 
    description: 'todo1',
    dueDate: new Date(2021, 3, 20, 12, 00),
    authorName: "admin",
    peopleInvolved: ["user"]
  },
  { 
    description: 'todo2',
    dueDate: new Date(2019, 3, 20, 12, 00),
    authorName: "user",
    peopleInvolved: ["admin"]
  }
]

const tableExistenceQuery = (model) => {
  return `SELECT EXISTS ( SELECT FROM pg_tables WHERE  tablename  = '${model.tableName}')`
}
const tableCreationQuery = (model) => {
  queryString = `CREATE TABLE ${model.tableName} (${model.columns.map( (column) => {
    return `${column.columnName} ${column.dataType}`
  })})`
  return queryString
}

const userInsertQuery = (user) => {
  return `INSERT INTO ${userTableModel.tableName} VALUES ('${user.username}', '${user.password}'`
}

const todoInsertQuery = (todo) => {
  return `INSERT INTO ${todoTableModel.tableName} VALUES ('${todo.authorName}', '${todo.description}', to_timestamp(${todo.dueDate.toUTCString} / 1000.0));`

}

const addresseeInsertQuery = (addressees, todoId) => {
  var query = `ÌNSERT INTO ${todoAdresseesTableModel.tableName} VALUES ${addressees.map((addressee) => {
    return `(${todoId}, '${addressee}'), ` //is the last comma a problem?
    })};`

}


const insertTodo = async (todo) => {
  if ( !todo.description 
    || !todo.dueDate 
    || !todo.authorName
    ){
    throw "Invalid Todo Data Error"
  }
  try {
    //add todo
    response = pool.query(todoInsertQuery(todo))
    //add todoaddressees
    console.log('This is the Insert Response:', response)
  } catch (error) {
    console.log(error)
  }
}

const insertUsers = (user) => {
  if (!user.username || !user.password ){
    throw "Invalid User Data Error"
  }
  try {
    pool.query(userInsertQuery(user))
  } catch (error) {
    console.log(error)
  }
}

const initializeTodos = async () => {
  console.log('start initialization of the table')
  try {
    await pool.query(tableCreationQuery(todoTabelModel))
    initialTodos.forEach((todo) => insertTodo(todo) )
  } catch (error) {
    console.log(error)
  } 
}

const initializeUsers = async () => {
  console.log('start initialization of the table')
  try {
    await pool.query(tableCreationQuery(userTableModel))
    initialUsers.forEach((user) => insertUsers(user) )
  } catch (error) {
    console.log(error)
  } 
}


/*db initialization to be put here*/
const initialize = async () => {

  //initializing users
  console.log('doing start up of users.')
  try {
    const response = await pool.query(tableExistenceQuery(userTableModel))
    if (! res.rows[0].exists ) {
      await initializeUsers()
    } else{
      console.log('Tablecheck done.')
    }
  } catch (error) {
    console.log(error)
  }

    
  //initializing todos
  console.log('doing start up of todos.')
  try {
    const response = await pool.query(tableExistenceQuery(todoTableModel))
    if (! res.rows[0].exists ) {
      await initializeTodos(todoTableModel.tableName)
    } else{
      console.log('Tablecheck done.')
    }
  } catch (error) {
    console.log(error)
  }


}



module.exports = {
  initialize,
  insertTodo,
  todoTabelModel,
  userTableModel,
  todoAdresseesTableModel,
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
  syncquery: (text, params) => {
    return pool.query(text, params)
  },
}