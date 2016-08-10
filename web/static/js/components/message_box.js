import React, { Component } from 'react';

class MessageBox extends Component {

  render() {
    return (
      <div className="col-md-8">
        <h2>Messages</h2>
        <ul className="list-unstyled">
        </ul>
        <input type="text" placeholder="Type and press enter..." className="form-control"/>
      </div>
    )
  }

}

export default MessageBox;
