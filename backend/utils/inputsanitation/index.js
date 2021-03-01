const { request } = require("express")

const sanitLoginData = (requestData) => {
  console.log(requestData)
  if (requestData.username && requestData.password) {
    return requestData
  }
}

const sanitTdleData = (requestData, username) => {
  if (
    requestData.description &&
    typeof requestData.description === 'string' &&
    requestData.duedate &&
    Date.parse(requestData.duedate) !== NaN &&
    username
    ) {
      requestData.author = username
      if (requestData.peopleinvolved && requestData.peopleinvolved.length > 0) {
        var peopleinvolvedCheckPassed = true
        requestData.peopleinvolved.forEach(element => {
          if (typeof element !== 'string' || element.length > 30) {
            peopleinvolvedCheckPassed = false
          }
        })
        if (!peopleinvolvedCheckPassed) {
           return
        }
      }
      if (requestData.description.length > 140) {
        requestData.description = requestData.description.substring(0, 139)
        console.warn('Warning: Input String to long input. Truncated the string.')
      }
      return requestData
    }
}

module.exports = { sanitLoginData, sanitTdleData }