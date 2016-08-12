import { combineReducers } from 'redux';

import {messages} from './message'
import {user} from './user'

const reducers = {
  user: user,
  messages: messages
};

export default reducers;
