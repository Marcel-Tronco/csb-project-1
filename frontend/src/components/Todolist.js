import React from 'react'
import { useState, useEffect } from 'react'
import TodoCreationInput from './TodoCreationInput'
import tdlService from '../service/tdlService'

const Todolist = () => {
  const [ tdlData, setTdlData ] = useState([])
  const [ myTodos, setMyTodos ] = useState([])
  const [ otherTodos, setOtherTodos ] = useState([])

  useEffect(() => {
    const fetchTdlData = async () => {
      const temp1 = await tdlService.getAll()
      var myTodosTmp = []
      var otherTodosTmp = []
      const username = sessionStorage.getItem('username')
      temp1.forEach(todo => {
        if ( username === todo.author ){
          myTodosTmp = myTodosTmp.concat(todo)
        } else if ( todo.peopleinvolved && todo.peopleinvolved.includes(username)){
          otherTodosTmp = otherTodosTmp.concat(todo)
        }
      })
      setMyTodos(myTodosTmp)
      setOtherTodos(otherTodosTmp)
    }
    fetchTdlData()
  }, [] )

  const tdlSubmissionHandler = async ({ todo }) => {
    const returnTodo = await tdlService.addOne(todo)
    setTdlData(tdlData.concat(returnTodo))
  }



  return (
    <div className="Todolist">
      <TodoCreationInput tdlSubmissionHandler={tdlSubmissionHandler}/>
      <h1> My Todos </h1>
      <ul>
        {myTodos.map((todo) => <li key={todo.description}> { todo.description } -- peopleinvolved: {todo.peopleinvolved} -- due on: {todo.duedate} </li> ) }
      </ul>
      <h2> Shared todos</h2>
      <ul>
        {otherTodos.map((todo) => <li key={todo.description}> {todo.author}&apos;s todo:  { todo.description } -- peopleinvolved: {todo.peopleinvolved} -- due on: {todo.duedate} </li> ) }
      </ul>
    </div>
  )
}

export default Todolist