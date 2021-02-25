const db = require('../db')
const { sanitLoginData } = require('../utils/inputsanitation')

const login = async (requestData) => {
  user = sanitLoginData(requestData)
  if (! user) {
    return {username: null, success: false}
  }

  try {
    const { rows } = await db.syncquery(`SELECT password FROM ${db.userTableModel.tableName} WHERE username='${user.username}'`)
    if (rows && rows[0]){
      console.log(rows[0], user)
      return {username: user.username, success: user.password === rows[0].password ? true : false}
    } else{
      return {username: user.username, success: false}
    }
  } catch (error) {
    console.log('get todos error:', error)
    return {username: user.username, success: false}
  }

}

module.exports = { login }