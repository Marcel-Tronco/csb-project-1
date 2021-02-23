import React from 'react'
import { useField, resetRemoval } from '../hooks/index'
import { Button, TextField } from '@material-ui/core'

const TodoCreationInput = ({ tdlSubmissionHandler }) => {
  const todoField = useField('todo', 'Todo', 'todo')

  const onSubmit = (event) => {
    event.preventDefault()
    tdlSubmissionHandler({ todo: todoField.value })
    todoField.reset()
  }
  return (
    <form onSubmit={onSubmit}>
      <TextField label="Todo" maxLength="140" { ...resetRemoval(todoField) } />
      <Button variant="contained" color="primary" type="submit">
            create todo entry
      </Button>
    </form>
  )
}

export default TodoCreationInput
