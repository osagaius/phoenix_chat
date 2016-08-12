import React, { Component } from 'react';
import InputForm from './input_form'

var MessageInput = React.createClass({
  handleSubmit(text) {
    this.props.handleMessageInput(text)
  },

  render() {
    return (
      <div>
        <InputForm
        placeholder={"Type and press enter..."}
        handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }

})

export default MessageInput;
