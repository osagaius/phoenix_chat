import { PRESENCES_CHANGED
} from '../actions/presences';

export function presences(state = {}, action) {
  switch (action.type) {
    case PRESENCES_CHANGED:
      return Object.assign({}, state, {
        value: action.presences,
        lastUpdated: action.receivedAt
      });

    default:
      return state;
  }
}
