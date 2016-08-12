import { combineReducers } from 'redux';

import {messages} from './message'
import {user} from './user'
import {presences} from './presences'

const reducers = {
  user: user,
  messages: messages,
  presences: presences
};

export default reducers;
