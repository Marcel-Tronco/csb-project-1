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
    new Column("adressee_id", 'varchar(30) references users(username)'),
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
  {username: 'user', password: 'user'},
  {username: 'anyone', password: 'anyone'}
]

const initialTodos = [
  { 
    description: 'todo1',
    duedate: new Date(2021, 3, 20, 12, 0),
    author: "admin",
    peopleinvolved: ["user"]
  },
  { 
    description: 'todo2',
    duedate: new Date(2019, 3, 20, 12, 0),
    author: "user",
    peopleinvolved: ["admin"]
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
  return `INSERT INTO ${userTableModel.tableName} VALUES ('${user.username}', '${user.password}') RETURNING *;`
}

const todoInsertQuery = (todo) => {
  return `INSERT INTO ${todoTableModel.tableName} VALUES ('${todo.author}', '${todo.description}', $1) RETURNING *;`

}

const adresseeInsertQuery = (adressees, todoId) => {
  var query = `INSERT INTO ${todoAdresseesTableModel.tableName} VALUES (${todoId}, '${adressees[0]}') ${adressees.map((adressee, i) => {
    if (i === 0 ){
      return
    } else {
      return `, (${todoId}, '${adressee}') `
    }
  })} RETURNING *;`
  return query
}


const insertTodo = async (todo) => {
  console.log('start inserting todos')
  if ( !todo.description 
    || !todo.duedate 
    || !todo.author
    ){
    throw "Invalid Todo Data Error"
  }
  try {
    //add todo
    let query = todoInsertQuery(todo)
    const res = await pool.query(query, [todo.duedate])
    console.log('todo added.')
    //add todoadressees
    query = adresseeInsertQuery(todo.peopleinvolved, res.rows[0].id) 
    console.log(query)
    await pool.query(query)
  } catch (error) {
    console.log(error)
  }
}

const insertUsers = (user) => {

  if (!user.username || !user.password ){
    throw "Invalid User Data Error"
  }
  try {
    let query = userInsertQuery(user) 
    pool.query(query)
  } catch (error) {
    console.log(error)
  }
}

const initializeTodos = async () => {
  console.log('start initialization of todos table')
  try {
    let query = tableCreationQuery(todoTableModel)
    await pool.query(query)
    console.log('todo table created')
    query = tableCreationQuery(todoAdresseesTableModel)
    await pool.query(query)
    console.log('todo adressee table created')
    
    initialTodos.forEach((todo) => insertTodo(todo) )
  } catch (error) {
    console.log(error)
  } 
}

const initializeUsers = async () => {
  console.log('start initialization of user table')
  try {
    let query = tableCreationQuery(userTableModel)
    await pool.query(query)
    console.log('usertable created')
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
    const res = await pool.query(tableExistenceQuery(userTableModel))
    if (! res.rows[0].exists ) {
      await initializeUsers()
    } else{
      console.log('Tablecheck done.')
    }
  } catch (error) {
    console.log(error)
    return
  }

    
  //initializing todos
  console.log('doing start up of todos.')
  try {
    const res = await pool.query(tableExistenceQuery(todoTableModel))
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
  addTodo: insertTodo,
  todoTableModel,
  userTableModel,
  todoAdresseesTableModel,
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
  syncquery: (text, params) => {
    return pool.query(text, params)
  },
}