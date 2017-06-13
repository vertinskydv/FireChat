import { ActionReducer, Action } from '@ngrx/store';
import { ADD_NEW_CHAT } from './actions';

export const chatState = (state: any = {}, action: Action) => {
  switch (action.type) {
    case ADD_NEW_CHAT:
      console.log(action);
      return Object.assign({}, state, {'chatName': action.payload});

    default:
      return state;
  }
};
