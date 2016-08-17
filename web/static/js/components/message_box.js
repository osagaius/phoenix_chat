import React, { Component } from 'react';

import MessageList from './message_list'
import MessageInput from './message_input'

class MessageBox extends Component {
  render() {
    return (
      <div className="col-md-8">
        <h2>Messages</h2>
        {this.props.messages ? <MessageList messages={this.props.messages}/> : <div/>}
        <MessageInput handleMessageInput={this.props.handleMessageInput}/>
      </div>
    )
  }

}

export default MessageBox;
