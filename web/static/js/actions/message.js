var Config = require('Config')
import { Socket } from 'phoenix'

let socket = new Socket("/socket", {params: {user: "Osa"}})

export const JOIN_CHANNEL = 'JOIN_CHANNEL';
function dispatchJoinChannel() {
  return { type: JOIN_CHANNEL};
}

export const LEAVE_CHANNEL = 'LEAVE_CHANNEL';
function leaveChannel() {
  return { type: LEAVE_CHANNEL };
}

export const NEW_MESSAGES = 'NEW_MESSAGES';
function newPosts(messages) {
  return { type: NEW_MESSAGES, messages, receivedAt: Date.now()};
}

//TODO Move channel stuff to separate action/reducer i.e channel.js
export function openChannel() {
  return (dispatch, getState) => {

    dispatch(dispatchJoinChannel());

    socket.connect();

    //STORE channel in Redux by dispatching
    let channel = socket.channel(`rooms:lobby`);
    channel.join()

    channel.on("new_posts", payload => {
      dispatch(newPosts(payload));
    })
  }
}

export function closeChannel() {
  return (dispatch, getState) => {
    dispatch(leaveChannel());

    let channel = socket.channel(`rooms:lobby`);
    channel.leave()
  }
}
