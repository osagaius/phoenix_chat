export const NEW_MESSAGES = 'NEW_MESSAGES';
export function newPosts(messages) {
  return { type: NEW_MESSAGES, messages, receivedAt: Date.now()};
}

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export function newMessage(message) {
  return { type: SEND_MESSAGE_REQUEST, message, receivedAt: Date.now()};
}

export function sendNewMessage(text) {
  return (dispatch, getState) => {
    getState().user.channel.push("new:msg", {body: text})
    dispatch(newMessage(text))
  }
}
