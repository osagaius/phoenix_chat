import { SEND_MESSAGE_REQUEST, NEW_MESSAGES
} from '../actions/message';

export function messages(state = {}, action) {
  switch (action.type) {
    case NEW_MESSAGES:
      return Object.assign({}, state, {
        value: action.messages.value,
        lastUpdated: action.receivedAt
      });

    case SEND_MESSAGE_REQUEST:
      return state;

    default:
      return state;
  }
}
