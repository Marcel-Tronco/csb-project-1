import React from 'react'
import LoginForm from './LoginForm'


const LoginView = ({ loginHandler }) => {
  return (
    <>
      <LoginForm loginHandler={loginHandler}/>
    </>
  )
}

export default LoginView