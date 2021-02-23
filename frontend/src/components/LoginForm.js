import React from 'react'
import { useField, resetRemoval } from '../hooks/index'
import { Button, TextField } from '@material-ui/core'

const LoginForm = ({ loginHandler }) => {
  const passwordField = useField('password', 'Password', 'password', 'password')
  const usernameField = useField('username', 'Username', 'username', 'username')

  const onSubmit = (event) => {
    event.preventDefault()
    loginHandler({ password: passwordField.value, username: usernameField.value })
    passwordField.reset()
    usernameField.reset()
  }
  return (
    <form onSubmit={onSubmit}>
      <TextField label="Username" maxLength="140" { ...resetRemoval(usernameField) } />
      <TextField label="Password" maxLength="140" { ...resetRemoval(passwordField) } />
      <Button variant="contained" color="primary" type="submit">
            login
      </Button>
    </form>
  )
}

export default LoginForm
