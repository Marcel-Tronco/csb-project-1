import React from 'react'
import { useState, useEffect } from 'react'
import TodoCreationInput from './TodoCreationInput'
import tdlService from '../service/tdlService'

const Todolist = () => {
  const [ tdlData, setTdlData ] = useState([])
  useEffect(() => {
    const fetchTdlData = async () => {
      const temp1 = await tdlService.getAll()
      setTdlData(temp1)
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
        <li>Personal exampletodo -- Due Date</li>
        {tdlData.map((tdle) => <li key={tdle}> { tdle } </li> ) }
      </ul>
      <h2> Shared todos</h2>
      <ul>
        <li>Example user: Example Task -- Due Date </li>
      </ul>
    </div>
  )
}

export default Todolist