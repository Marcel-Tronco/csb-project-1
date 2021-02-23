const { request } = require("express")

const sanitLoginData = (requestData) => {
  console.log(requestData)
  if (requestData.username && requestData.password) {
    return requestData
  }
}

module.exports = { sanitLoginData }