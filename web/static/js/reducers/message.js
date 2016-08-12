import { MESSAGE_INPUT_CHANGED, NEW_MESSAGES
} from '../actions/message';

export function messages(state = {}, action) {
  switch (action.type) {
    case NEW_MESSAGES:
      return Object.assign({}, state, {
        value: action.messages.value,
        lastUpdated: action.receivedAt
      });

    case MESSAGE_INPUT_CHANGED:
      return state;

    default:
      return state;
  }
}
