import React, { PropTypes } from 'react'

import OnlineUsersList from './online_users_list'
import TotalMessages from './total_messages'

const SideBar = (props) => {
  return (
    <div className="col-md-4">
      <OnlineUsersList presences={props.presences}/>
      <TotalMessages totalMessages={props.totalMessages} />
      <button onClick={props.handleUserLeave}
        type="button" className="btn btn-warning">
        Leave
      </button>
    </div>
  )
}

export default SideBar
