import {
  JOIN_CHANNEL_FAILURE, JOIN_CHANNEL_SUCCESS, LEAVE_CHANNEL
} from '../actions/user';

export function user(state = {}, action) {
  switch (action.type) {
    case JOIN_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        socket: action.socket,
        channel: action.channel,
        username: action.username,
        lastUpdated: action.joinedAt
      });

    case JOIN_CHANNEL_FAILURE:
      return Object.assign({}, state, {
        username: action.username,
        rejected: true,
        reason: action.reason
      });

    case LEAVE_CHANNEL:
      return Object.assign({}, state, {
        username: null
      });
    
    default:
      return state;
  }
}
