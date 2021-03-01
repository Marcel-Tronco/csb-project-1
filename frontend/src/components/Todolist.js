import React from 'react'
import { useState, useEffect } from 'react'
import TodoCreationInput from './TodoCreationInput'
import tdlService from '../service/tdlService'
import { useHistory } from 'react-router-dom'

const Todolist = ({ user, removeUser }) => {
  const [ allTodos, setAllTodos ] = useState({ myTodos: [], otherTodos: [] })
  const history = useHistory()
  const addToMyTodos = (todo) => {
    setAllTodos({ myTodos: allTodos.myTodos.concat(todo), otherTodos: allTodos.otherTodos })
  }
  /*  const filterTodos = (todos) => {
    var myTodosTmp = []
    var otherTodosTmp = []
    const username = sessionStorage.getItem('loggedin')
    todos.forEach(todo => {
      if ( user === todo.author ){
        myTodosTmp = myTodosTmp.concat(todo)
      } else if ( todo.peopleinvolved && todo.peopleinvolved.includes(username)){
        otherTodosTmp = otherTodosTmp.concat(todo)
      }
    })
    return { myTodos: myTodosTmp, otherTodos: otherTodosTmp }
  }
*/
  useEffect(() => {
    const fetchTdlData = async () => {
      const tmp1 = await tdlService.getAll()
      var myTodosTmp = []
      var otherTodosTmp = []
      console.log('blub', tmp1)
      if (!tmp1 || (tmp1.status && tmp1.status === 401)) {
        setAllTodos({ myTodos: [], otherTodos: [] })
        removeUser()
        history.push('/login')
      } else {
        tmp1.forEach(todo => {
          if ( user === todo.author ){
            myTodosTmp = myTodosTmp.concat(todo)
          } else if ( todo.peopleinvolved && todo.peopleinvolved.includes(user)){
            otherTodosTmp = otherTodosTmp.concat(todo)
          }
        })
        setAllTodos({
          myTodos: myTodosTmp,
          otherTodos: otherTodosTmp
        })
      }
    }
    fetchTdlData()
  }, [user, history, removeUser])
  if (!user) {
    history.push('/login')
  }
  const tdlSubmissionHandler = async ( todo ) => {
    const added = await tdlService.addOne(todo)
    if ( added && added.tdle) {
      addToMyTodos(added.tdle)
    }
  }



  return (
    <div className="Todolist">
      <TodoCreationInput tdlSubmissionHandler={tdlSubmissionHandler}/>
      <h1> My Todos </h1>
      <ul>
        {allTodos.myTodos.map((todo) => <li key={todo.description}> { todo.description } -- peopleinvolved: {todo.peopleinvolved} -- due on: {todo.duedate} </li> ) }
      </ul>
      <h2> Shared todos</h2>
      <ul>
        {allTodos.otherTodos.map((todo) => <li key={todo.description}> {todo.author}&apos;s todo:  { todo.description } -- peopleinvolved: {todo.peopleinvolved} -- due on: {todo.duedate} </li> ) }
      </ul>
    </div>
  )
}

export default Todolist