import React, { Component } from 'react';
import {Presence} from 'phoenix'

let formatTimestamp = (timestamp) => {
  let date = new Date(timestamp)
  return date.toLocaleTimeString()
}
let listBy = (user, {metas: metas}) => {
  return {
    user: user,
    onlineAt: formatTimestamp(metas[0].online_at)
  }
}

class OnlineUsersList extends Component {
  renderUsers() {
    return Presence.list(this.props.presences, listBy).map((presence) => {
      return <li key={presence.user}>
        <b>{presence.user}</b> - online since {presence.onlineAt}
      </li>
    })
  }

  render() {
    return (
      <div>
        <h2>Who’s Online</h2>
        <ul id="UserList" className="list-unstyled">
          {this.renderUsers()}
        </ul>
      </div>
    )
  }

}

export default OnlineUsersList;
