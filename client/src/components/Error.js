import React from 'react'

function Error({message}) {
  return (
    <div style={{fontSize: 18, padding: 14, color:"red"}}>Error: {message}</div>
  )
}

export default Error