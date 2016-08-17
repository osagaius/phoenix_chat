import React, { PropTypes } from 'react'

const TotalMessages = (props) => {
  return (
    <div className="alert-success">
      Total Messages
      <hr />
      <p>
        {props.totalMessages}
      </p>
    </div>
  )
}

export default TotalMessages
