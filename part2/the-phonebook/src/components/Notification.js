import React from 'react';
import '../index.css'

const Notification = ({ message, error }) => {
  if (message === '') {
    return null
  }

  return (
    <div className={`notification ${error ? "error" : ""}`}>
      {message}
    </div>
  )
}

export default Notification