import { ActionReducer, Action } from '@ngrx/store';
import { ADD_NEW_CHAT, CHANGE_USER_STATUS } from './actions';

export const chatState = (state: any = {}, action: Action) => {
  switch (action.type) {
    case ADD_NEW_CHAT:
      return Object.assign({}, state, {'chatName': action.payload});



    default:
      return state;
  }
};
