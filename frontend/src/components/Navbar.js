import React from 'react'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NavBar = ({ user, logOut }) => {
  logOut = logOut ? logOut : () => {console.log('Logging is not implemented yet.')}
  return(
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
      todos
        </Button>
        <Button color="inherit" component={Link} to="/users">
      users
        </Button>
        {user
          ? <>
            <em> {user.name} logged in </em>
            <Button color="inherit" component={Link} to="/" onClick={logOut} >
              logout
            </Button>
          </>
          : <Button color="inherit" component={Link} to="/login">
          login
          </Button>
        }
      </Toolbar>
    </AppBar>

  )
}

export default NavBar