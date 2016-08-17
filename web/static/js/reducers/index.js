import { combineReducers } from 'redux';

import {messages} from './message'
import {user} from './user'
import {presences} from './presences'
import {messagesTotal} from './messages_total'

const reducers = {
  user: user,
  messages: messages,
  presences: presences,
  messagesTotal: messagesTotal
};

export default reducers;
