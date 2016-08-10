import React, { Component } from 'react';
import { connect } from 'react-redux';

import {openChannel, leaveChannel} from '../actions/message'

import MessageBox from '../components/message_box'
import SideBar from '../components/sidebar'
import TotalPosts from '../components/total_posts'

class App extends Component {
  componentWillUnmount() {
    let { dispatch } = this.props;
    dispatch(leaveChannel())
  }

  componentWillMount() {
    let { dispatch } = this.props;
    dispatch(openChannel())
  }

  render() {
    return (
      <div>
        <MessageBox messages={this.props.messages.value}/>
        <SideBar/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps)(App);
