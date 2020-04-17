import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((carry, part) => {
    return carry += part.exercises
  }, 0)

  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

export default Total