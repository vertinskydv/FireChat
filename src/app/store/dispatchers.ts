import { Action } from '@ngrx/store';
import { ADD_NEW_CHAT, CHANGE_LOGIN_STATUS, UPDATE_CHAT_LIST } from './actions';

export function chatState (state: any = {}, action: Action) {
  switch (action.type) {
    case ADD_NEW_CHAT:
      return Object.assign({}, state, {'chatName': action.payload});

    case CHANGE_LOGIN_STATUS:
      return Object.assign({}, state, {'user': action.payload});

    case UPDATE_CHAT_LIST:
      return Object.assign({}, state, {'chatList': action.payload});

    default:
      return state;
  }
};
