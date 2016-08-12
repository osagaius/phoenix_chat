import { Socket } from 'phoenix'
import {newPosts} from './message'

export const JOIN_CHANNEL_SUCCESS = 'JOIN_CHANNEL_SUCCESS';
function joinChannelSuccess(username, socket, channel) {
  return { type: JOIN_CHANNEL_SUCCESS, username, socket, channel,
  joinedAt: Date.now()};
}

export const JOIN_CHANNEL_FAILURE = 'JOIN_CHANNEL_FAILURE';
function joinChannelFailure(username, reason) {
  return { type: JOIN_CHANNEL_FAILURE, username, reason};
}

export const LEAVE_CHANNEL = 'LEAVE_CHANNEL';
function leaveChannel() {
  return { type: LEAVE_CHANNEL };
}

export function openChannel(username) {
  return (dispatch, getState) => {
    let socket = new Socket("/socket", {params: {user: username}})

    socket.connect();
    let channel = socket.channel(`rooms:lobby`);

    channel.join()
    .receive("ok", resp => {
      dispatch(joinChannelSuccess(username, socket, channel))
    })
    .receive("error", resp => {
      dispatch(joinChannelFailure(username, resp))
    })

    channel.on("new_posts", payload => {
      dispatch(newPosts(payload));
    })
  }
}

export function closeChannel() {
  return (dispatch, getState) => {
    dispatch(leaveChannel());

    getState.user.channel.leave()
  }
}
