import React, { useState } from 'react'
import Todolist from './components/Todolist'
import LoremPicsumElement from './components/LoremPicsumElement'
import { Switch, Route, useHistory } from 'react-router-dom'
import NavBar from './components/Navbar.js'
import LoginView from './components/LoginView'
import Notification from './components/Notification'
import loginService from './service/loginService'


const App = () => {
  const history = useHistory()
  const [notificationMessage, setNotification] = useState(sessionStorage.getItem('login')? 'Logged in' : '')
  const loginHandler = async (formData) => {
    const loggedIn = await loginService.login(formData)
    console.log(loggedIn)
    if ( !loggedIn ) {
      setNotification('Login didn\'t succeed. Did you use the write credentials?')
      sessionStorage.removeItem('login')
    } else {
      setNotification('Logged in.')
      history.push('/')
    }
  }

  return (
    <div className="App">
      <LoremPicsumElement />
      <NavBar/>
      <Notification message={notificationMessage} />
      <Switch>
        <Route path='/login'>
          <LoginView loginHandler={loginHandler} />
        </Route>
        <Route path='/'>
          <Todolist />
        </Route>

      </Switch>
    </div>
  )
}
// ¯\_(ツ)_/¯
export default App
