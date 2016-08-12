import React, { Component } from 'react';
import { connect } from 'react-redux';

import {openChannel, closeChannel} from '../actions/user'

import MessageBox from '../components/message_box'
import SideBar from '../components/sidebar'
import TotalPosts from '../components/total_posts'
import UserNameInput from '../components/user_name_input'

class App extends Component {
  handleUserLeave() {
    let { dispatch } = this.props;
    dispatch(closeChannel())
  }

  handleUserJoin(username) {
    let { dispatch } = this.props;
    dispatch(openChannel(username))
  }

  render() {
    if (this.props.user.username) {
      return (
        <div>
          <MessageBox messages={this.props.messages.value}/>
          <SideBar handleUserLeave={this.handleUserLeave.bind(this)}/>
        </div>
      )
    } else {
      return <UserNameInput handleUserJoin={this.handleUserJoin.bind(this)}/>
    }
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user
  };
}

export default connect(mapStateToProps)(App);
