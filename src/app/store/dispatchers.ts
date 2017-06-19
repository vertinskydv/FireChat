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
         SET_INITIAL_CHATLIST_VALUE,
         CHAT_LIST_ITEM_CHANGE,
         CHAT_LIST_ITEM_ADD
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

    case SELECT_CURRENT_CHAT:
      return Object.assign({}, state, {'currentChatID': action.payload});

    case SET_INITIAL_CHATLIST_VALUE: {
      let newState = Object.assign({}, state);
      newState.chatDateIDList = action.payload;
      newState.chatListQuantity = action.payload.length;

      return newState;
    }

    case CHAT_LIST_ITEM_CHANGE: {
      debugger;
      let newState = Object.assign({}, state);
      let coincidence = newState.chatDateIDList.find((value, index) => {
        if (value[0] === action.payload[0]) {
          newState.chatDateIDList.splice(index, 1);
          return true;
        }
        return false;
      });
      newState.chatDateIDList.unshift(action.payload);
      if (!coincidence) {
        newState.chatListQuantity ++;
      }
      return newState;
    }

    case CHAT_LIST_ITEM_ADD: {
      let newState = Object.assign({}, state);
      if (!newState.hasOwnProperty('chatDateIDList')) {
        newState.chatDateIDList = [];
        newState.chatListQuantity = 0;
      }
      newState.chatDateIDList.unshift(action.payload);
      newState.chatListQuantity ++;
      return newState;

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
