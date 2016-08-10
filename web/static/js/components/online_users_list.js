import React, { Component } from 'react';

class OnlineUsersList extends Component {

  render() {
    return (
      <div>
        <h2>Who’s Online</h2>
        <ul id="UserList" className="list-unstyled">
          <li>Loading online users...</li>
        </ul>
      </div>
    )
  }

}

export default OnlineUsersList;
