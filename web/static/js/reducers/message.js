import { JOIN_CHANNEL, LEAVE_CHANNEL, NEW_MESSAGES
} from '../actions/message';

export function channel(state = {}, action) {
  switch (action.type) {
    case JOIN_CHANNEL:
      return state;

    default:
      return state;
  }
}

export function messages(state = {}, action) {
  switch (action.type) {
    case NEW_MESSAGES:
      return Object.assign({}, state, {
        value: action.messages.value,
        lastUpdated: action.receivedAt
      });

    default:
      return state;
  }
}
