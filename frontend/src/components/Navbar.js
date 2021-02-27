import React from 'react'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NavBar = ({ user, logout }) => {
  return(
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
      todos
        </Button>
        {user
          ? <>
            <em> {user} logged in </em>
            <Button color="inherit" component={Link} to="/" onClick={logout} >
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