import React, { Component } from 'react';
import InputForm from './input_form'

var UserNameInput = React.createClass({
  handleSubmit(username) {
    this.props.handleUserJoin(username)
  },

  render() {
    return (
      <div>
        <h2>Choose a username to join the chatroom</h2>
        <InputForm
        placeholder={"Jennifer"}
        handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }

})

export default UserNameInput;
