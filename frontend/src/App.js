import React, { useState } from 'react'
import Todolist from './components/Todolist'
import LoremPicsumElement from './components/LoremPicsumElement'
import { Switch, Route, useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import NavBar from './components/Navbar.js'
import LoginView from './components/LoginView'
import loginService from './service/loginService'


const App = () => {
  const history = useHistory()
  const [notificationMessage, setNotification] = useState('')
  const [user, setUser] = useState(
    sessionStorage.getItem('loggedin') ?
      sessionStorage.getItem('loggedin') :
      undefined
  )

  const logoutHandler = () => {
    sessionStorage.removeItem('loggedin')
    setUser(undefined)
  }
  const loginHandler = async (formData) => {
    const loggedIn = await loginService.login(formData)
    if ( !loggedIn ) {
      setNotification('Login didn\'t succeed. Did you use the write credentials?')
      setTimeout(() => { setNotification('') }, 5000)
      sessionStorage.removeItem('loggedin')
      setUser(undefined)
    } else {
      sessionStorage.setItem('loggedin', loggedIn)
      setUser(loggedIn)
      history.push('/')
    }
  }

  return (
    <div className="App">
      <LoremPicsumElement />
      <NavBar user={user} logout={logoutHandler} />
      {notificationMessage ? <Alert severity="error">{notificationMessage}</Alert> : undefined }
      <Switch>
        <Route path='/login'>
          <LoginView loginHandler={loginHandler} />
        </Route>
        <Route path='/'>
          <Todolist user={user} />
        </Route>

      </Switch>
    </div>
  )
}
// ¯\_(ツ)_/¯
export default App
