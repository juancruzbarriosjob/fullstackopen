import React from 'react'

const Course = ({ course }) => {
  return (
    <>
    <SubHeader name={course.name} />
    {course.parts.map((part) =>
      <Part key={part.id} part={part.name} exercise={part.exercises} />
    )}
    <Total parts={course.parts} />
    </>
  )
}

const SubHeader = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((carry, part) => {
    return carry += part.exercises
  }, 0)

  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

export default Course