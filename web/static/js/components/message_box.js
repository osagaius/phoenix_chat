import React, { Component } from 'react';

import MessageList from './message_list'

class MessageBox extends Component {
  render() {
    return (
      <div className="col-md-8">
        <h2>Messages</h2>
        {this.props.messages ? <MessageList messages={this.props.messages}/> : <div/>}
        <input type="text" placeholder="Type and press enter..." className="form-control"/>
      </div>
    )
  }

}

export default MessageBox;
