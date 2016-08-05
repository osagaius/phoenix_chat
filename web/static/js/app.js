// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket, Presence} from "phoenix"
import moment from 'moment';

let presences = {}

let $username = $("#User")
$username.off("keypress").on("keypress", e => {
  if (e.keyCode == 13) {
    let user = document.getElementById("User").value
    let socket = new Socket("/socket", {params: {user: user}})
    socket.connect()

    let channel = socket.channel("rooms:lobby", {})
    channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

    let messagesContainer = $("#messages")
    channel.on("new_posts", payload => {
      messagesContainer.empty()
      payload.value.forEach(function(item) {
        let received_at = moment(item.received_at).calendar()
        messagesContainer.append(`${item.user} posted ${received_at} :<br/>${item.text}<br/>`)
      });
    })

    let totalPosts = $("#total_posts")
    channel.on("total_posts_changed", payload => {
      totalPosts.empty()
      totalPosts.append(`${payload.value}`)
    })

    channel.on("presence_state", state => {
      Presence.syncState(presences, state)
      render(presences)
    })

    channel.on("presence_diff", diff => {
      Presence.syncDiff(presences, diff)
      render(presences)
    })

    let $input = $("#message-input")
    $input.off("keypress").on("keypress", e => {
      if (e.keyCode == 13) {
        channel.push("new:msg", {body: $input.val()})
        $input.val("")
      }
    })
  }
})

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

let userList = document.getElementById("UserList")
let render = (presences) => {
  userList.innerHTML = Presence.list(presences, listBy)
    .map(presence => `
      <li>
        ${presence.user}
        <br>
        <small>online since ${presence.onlineAt}</small>
      </li>
    `)
    .join("")
}
