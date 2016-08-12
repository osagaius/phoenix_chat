import React, { Component } from 'react';

var UserNameInput = React.createClass({
  getInitialState() {
    return {usernameInput: ""}
  },
  handleChange(event) {
    this.setState({usernameInput: event.target.value.substr(0, 140).trim()});
  },

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.usernameInput.length > 1) {
      this.props.handleUserJoin(this.state.usernameInput)
    }
  },

  render() {
    return (
      <div>
        <h2>Choose a username to join the chatroom</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Jennifer..."
            className="form-control"
            type="text"
            value={this.state.usernameInput}
            onChange={this.handleChange}
            />
        </form>
      </div>
    )
  }

})

export default UserNameInput;
