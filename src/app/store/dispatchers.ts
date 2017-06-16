import { Action } from '@ngrx/store';
import { StoreClass } from './store.class';
import { IMPLEMENT_STORE,
         CLEAR_STORE,
         ADD_NEW_CHAT,
         CHANGE_LOGIN_STATUS,
         UPDATE_CHAT_LIST,
         SELECT_CURRENT_CHAT,
         REFRESH_CHAT_LIST,
         ADD_INITIAL_MESSAGES,
          } from './actions';

export function chatState (state: any = {}, action: Action) {
  switch (action.type) {

    case IMPLEMENT_STORE: {
      let newState = new StoreClass();
      return newState;
    }

    case CLEAR_STORE:
      return {};

    case ADD_NEW_CHAT:
      return Object.assign({}, state, {'chatName': action.payload});

    case CHANGE_LOGIN_STATUS:
      return Object.assign({}, state, {'user': action.payload});

    case UPDATE_CHAT_LIST:
      return Object.assign({}, state, {'chatIDList': action.payload});

    case SELECT_CURRENT_CHAT:
      return Object.assign({}, state, {'currentChatID': action.payload});

    case REFRESH_CHAT_LIST: {
      let newState = Object.assign({}, state);
      let chatItemList: Array<any> = [];
      for (let key in action.payload) {
        chatItemList.push(action.payload[key]);
        newState.chat[action.payload[key]] = {};
      }
      return Object.assign({}, state, {'chatIDList': action.payload, 'chatIDListArray': chatItemList});
    }

    case ADD_INITIAL_MESSAGES: {
      let newState = Object.assign({}, state);
      newState.chat[action.payload.chatKey] = {};
      newState.chat[action.payload.chatKey].lastMessageId = '';
      newState.chat[action.payload.chatKey].firstMessageId = '';
      newState.chat[action.payload.chatKey].messages = action.payload.messagesObj;
      return newState;
    }


    default:
      return state;
  }
}
