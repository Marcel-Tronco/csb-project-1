const db = require('../db')
const { sanitLoginData } = require('../utils/inputsanitation')

const initialUsers = [ {username: 'admin', password: 'admin'}, {username: 'user', password: 'user'}]
const tableName = 'usertable'
const columnName1 = 'username'
const columnName2 = 'password'

const logAdditionRes = (err, res) => {
  if (err) {
    console.log('Error while adding to db', err)
  } else {
    console.log('Adding to db succeded', res)
  }
}

const initializeTable = () => {
  console.log('start initialization of the table')
  db.query(`CREATE TABLE ${tableName} (${columnName1} VARCHAR(30), ${columnName2} VARCHAR )`, [], (err, res) => {
    if (err) {
      console.log('Error:', err)
    } else{
      initialUsers.forEach((user) => { 
        db.query(`INSERT INTO ${tableName} VALUES ('${user.username}', '${user.password}');`, 
          [], 
          logAdditionRes)
      })
    }
  })
}

const onStartUp = () => {
  //check if todo table exists
  console.log('doing start up - logintable.')
  db.query(`SELECT EXISTS ( SELECT FROM pg_tables WHERE  tablename  = '${tableName}')`, [], (err, res) => {
    if (err) {
      console.log(err)
      //retryStartup()
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

const login = async (requestData) => {
  user = sanitLoginData(requestData)
  if (! user) {
    return false
  }

  try {
    const { rows } = await db.syncquery(`SELECT ${columnName2} FROM ${tableName} WHERE ${columnName1}='${user.username}'`)
    console.log('rows', rows)
    if (rows && rows[0]){
      console.log(rows[0], user)
      return user.password === rows[0].password
    } else{
      return false
    }
  } catch (error) {
    console.log('get todos error:', error)
    return false
  }

}

module.exports = { login }