import { Action } from '@ngrx/store';
import { ADD_NEW_CHAT, CHANGE_LOGIN_STATUS } from './actions';

export const chatState = function (state: any = {}, action: Action) {
  switch (action.type) {
    case ADD_NEW_CHAT:
      return Object.assign({}, state, {'chatName': action.payload});

    case CHANGE_LOGIN_STATUS:
      return Object.assign({}, state, {'user': action.payload});

    default:
      return state;
  }
}
