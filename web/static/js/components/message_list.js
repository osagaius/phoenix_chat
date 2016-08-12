import React, { Component } from 'react'
import moment from 'moment';
import ReactDOM from 'react-dom';

const styles={
  list: {
    height: 300,
    border: '1px solid #ccc',
    overflowY: 'auto',
    padding: 20
  }
}

class MessageList extends React.Component {
  componentDidMount() {
    this._div.scrollTop = styles.list.height * 2
  }

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
      <div style={styles.list} ref={(ref) => this._div = ref} >
        <ul className="list-unstyled">
          {this.renderMessages()}
        </ul>
      </div>
    )
  }
}

export default MessageList;
