const db = require('../db')
const { sanitLoginData } = require('../utils/inputsanitation')
const bcrypt = require('bcrypt')
const { request } = require('express')

const login = async (requestData) => {
  user = sanitLoginData(requestData)
  if (! user) {
    return {username: null, success: false}
  }
  try {
    const { rows } = await db.syncquery(`SELECT passwordhash FROM ${db.userTableModel.tableName} WHERE username='${user.username}'`)
    if (rows && rows[0]){
      console.log(rows[0], user)
      rows[0].password
      success = bcrypt.compareSync(user.password, rows[0].passwordhash)
      return {username: user.username, success}
    } else{
      return {username: null, success: false}
    }
  } catch (error) {
    console.log('get todos error:', error)
    return {username: user.username, success: false}
  }
}

const loginCheck = (sessionObj) => {
  var check1 = ! sessionObj 
  var check2 = ! sessionObj.loggedin
  var check3 = ! sessionObj.logindate
  var temp = ( Date.now() - sessionObj.logindate ) / ( 60 * 1000)
  var check4 = ! temp > 5
  var check5 = ! sessionObj.username
  if ( check1 ||  check2 || check3 || check4 || check5 ) {
    return false
  } else {
    return true
  }
}

module.exports = { login, loginCheck }