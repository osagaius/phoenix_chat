import React, { Component } from 'react';

var UserNameInput = React.createClass({
  getInitialState() {
    return {input: ""}
  },
  handleChange(event) {
    this.setState({input: event.target.value.substr(0, 140)});
  },

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.input.trim().length > 1) {
      this.props.handleSubmit(this.state.input)
      this.setState({input: ""});
    }
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <input
      placeholder={this.props.placeholder}
      className="form-control"
      type="text"
      value={this.state.input}
      onChange={this.handleChange}
      />
      </form>
    )
  }

})

export default UserNameInput;
