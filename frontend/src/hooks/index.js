import { useState } from 'react'

export const resetRemoval = (fieldObject) => {
  let reset, rest
  // eslint-disable-next-line no-unused-vars
  ({ reset, ...rest } = fieldObject)
  return rest
}

export const useField = (id, name, type='text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    var validatedValue = event.target.value
    if (validatedValue.length > 140) {
      validatedValue = validatedValue.substring(0, 139)
    }
    setValue(validatedValue)
  }
  const reset = () => setValue('')
  return {
    id,
    name,
    type,
    value,
    onChange,
    reset
  }
}