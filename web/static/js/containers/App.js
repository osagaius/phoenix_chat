import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageBox from '../components/message_box'
import SideBar from '../components/sidebar'
import TotalPosts from '../components/total_posts'

class App extends Component {

  render() {
    return (
      <div>
        <MessageBox/>
        <SideBar/>
      </div>
    )
  }

}

export default App;
