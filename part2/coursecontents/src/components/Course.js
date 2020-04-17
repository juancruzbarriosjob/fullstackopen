import React from 'react'
import Part from './Part'
import Total from './Total'

const Course = ({ course }) => {
  return (
    <>
    <h2>{course.name}</h2>
    {course.parts.map((part) =>
      <Part key={part.id} part={part.name} exercise={part.exercises} />
    )}
    <Total parts={course.parts} />
    </>
  )
}

export default Course