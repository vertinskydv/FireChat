import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class DataLoadingService {
  constructor() { }


  listenChatData(chatName: string, messagesNum: number) {
    let chatData: any = {},
        database = firebase.database();

    database.ref('/chats/' + chatName + '/lastMessageId').on('value', (snapshot) => {
      chatData.lastMessageId = snapshot.val();
      if (chatData.lastMessageId === -1) {
        chatData.firstMessageId = -1;
      } else if (chatData.lastMessageId - messagesNum + 1 <= 0) {
        chatData.firstMessageId = 0;
      } else {
        chatData.firstMessageId = chatData.lastMessageId - messagesNum + 1;
      }
      // console.log(chatData.lastMessageId);
    });

    database.ref('/chats/' + chatName + '/messages').limitToLast(messagesNum).on('value', (snapshot) => {
      chatData.messages = snapshot.val();
      // console.log(chatData.messages);
      console.log(chatData);
    });

    return chatData;
  }

  sendMessage(message?: string, chatName: string, UID: any) {
    if ((typeof message !== 'undefined') && (message!.search(/\S/g) !== -1)) {
      let updates = {},
        lastMessageId = this.chatData.lastMessageId,
        messageId = lastMessageId + 1,
        database = firebase.database();
      database.ref('chats/' + chatName + '/lastMessageId').set(messageId);
      database.ref('chats/' + chatName + '/messages').push({
        'message': message,
        'time': Date.now(),
        'user': UID
      });
    }
  }


}
