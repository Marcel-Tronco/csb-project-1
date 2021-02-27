import React from 'react'
import { useField, resetRemoval } from '../hooks/index'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const users = [
  'admin',
  'user',
  'anyone'
]

const TodoCreationInput = ({ tdlSubmissionHandler }) => {
  const descriptionField = useField('todo', 'Todo')
  const selectedUser = useField('selected user', 'Selected User')
  const dueDateField = useField('due date', 'Due Date', 'date')

  const onSubmit = (event) => {
    event.preventDefault()
    tdlSubmissionHandler({
      description: descriptionField.value,
      author: sessionStorage.getItem('loggedin'),
      peopleinvolved: [selectedUser.value],
      duedate: dueDateField.value
    })
    descriptionField.reset()
  }
  return (
    <form onSubmit={onSubmit}>
      <TextField label="Todo" maxLength="140" { ...resetRemoval(descriptionField) } />
      <TextField
        label="Due Date"
        InputLabelProps={{
          shrink: true,
        }}
        { ...resetRemoval(dueDateField) }
      />
      <FormControl>
        <InputLabel>Joining </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          { ...resetRemoval(selectedUser)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          { users.map((user) => <MenuItem value={user} key={user}> {user} </MenuItem>)}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
            create todo entry
      </Button>
    </form>
  )
}

export default TodoCreationInput
