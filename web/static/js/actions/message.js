export const NEW_MESSAGES = 'NEW_MESSAGES';
export function newPosts(messages) {
  return { type: NEW_MESSAGES, messages, receivedAt: Date.now()};
}

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export function sendMessageRequest(message) {
  return { type: SEND_MESSAGE_REQUEST, message};
}

export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export function sendMessageSuccess(message) {
  return { type: SEND_MESSAGE_SUCCESS, message};
}

export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export function sendMessageFailure(message) {
  return { type: SEND_MESSAGE_FAILURE, message};
}

export function sendNewMessage(text) {
  return (dispatch, getState) => {
    getState().user.channel.push("new:msg", {body: text})
  }
}
