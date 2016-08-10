import React, { Component } from 'react'
import moment from 'moment';

const styles={
  list: {
    height: 300,
    border: '1px solid #ccc',
    overflowY: 'auto',
    padding: 20
  }
}

class MessageList extends React.Component {
  renderMessages() {
    return this.props.messages.map(function(message) {
      return <li key={message.id}>
        {message.user} - {moment(message.received_at).calendar()}
        <br/>
        {message.text}
      </li>
    })
  }

  render () {
    return (
      <ul className="list-unstyled" style={styles.list}>
        {this.renderMessages()}
      </ul>
    )
  }
}

export default MessageList;
