import { combineReducers } from 'redux';

import {channel, messages} from './message'

const reducers = {
  channel: channel,
  messages: messages
};

export default reducers;
