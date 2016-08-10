import React, { PropTypes } from 'react'

import OnlineUsersList from './online_users_list'
import TotalPosts from './total_posts'

const SideBar = (props) => {
  return (
    <div className="col-md-4">
      <OnlineUsersList/>
      <TotalPosts />
    </div>
  )
}

export default SideBar
