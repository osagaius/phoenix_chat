import React, { PropTypes } from 'react'

import OnlineUsersList from './online_users_list'
import TotalPosts from './total_posts'

const SideBar = (props) => {
  return (
    <div className="col-md-4">
      <OnlineUsersList/>
      <TotalPosts />
      <button onClick={props.handleUserLeave}
        type="button" className="btn btn-warning">
        Leave
      </button>
    </div>
  )
}

export default SideBar
