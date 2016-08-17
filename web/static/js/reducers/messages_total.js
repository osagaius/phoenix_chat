import { NEW_MESSAGES_TOTAL
} from '../actions/messages_total';

export function messagesTotal(state = {}, action) {
  switch (action.type) {
    case NEW_MESSAGES_TOTAL:
      return Object.assign({}, state, {
        value: action.value,
        lastUpdated: action.receivedAt
      });

    default:
      return state;
  }
}
