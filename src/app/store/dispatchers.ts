import { Action } from '@ngrx/store';
import { ADD_NEW_CHAT,
         CHANGE_LOGIN_STATUS,
         UPDATE_CHAT_LIST,
         SELECT_CURRENT_CHAT,
         REFRESH_CHAT_LIST,
         ADD_INITIAL_MESSAGES } from './actions';

export function chatState (state: any = {}, action: Action) {
  switch (action.type) {
    case ADD_NEW_CHAT:
      return Object.assign({}, state, {'chatName': action.payload});

    case CHANGE_LOGIN_STATUS:
      return Object.assign({}, state, {'user': action.payload});

    case UPDATE_CHAT_LIST:
      return Object.assign({}, state, {'chatList': action.payload});

    case SELECT_CURRENT_CHAT:
      return Object.assign({}, state, {'currentChatID': action.payload});

    case REFRESH_CHAT_LIST:
      let chatItemList: Array<any> = [];
      for (let key in action.payload) {
        chatItemList.push(action.payload[key]);
      }
      return Object.assign({}, state, {'chatList': action.payload, 'chatListArray': chatItemList});

    case ADD_INITIAL_MESSAGES:
      let newState = Object.assign({}, state);
      if (newState.hasOwnProperty('messages')) {
        newState.messages[action.payload.chatKey] = action.payload.messagesObj;
      } else {
        newState.messages = {};
        newState.messages[action.payload.chatKey] =  action.payload.messagesObj;
      }
      return newState;


    default:
      return state;
  }
}
