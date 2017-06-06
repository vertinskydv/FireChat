import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class DataLoadingService {
  numberMessages: number = 30;

  constructor() { }


  // listenChatData(chatInfo) {
  //   let messagesData: any = {},
  //       database = firebase.database();
  //
  //
  //   database.ref('/chats/' + chatInfo.name + '/lastMessageId').on('value', (snapshot) => {
  //     chatInfo.lastMessageId = snapshot.val();
  //     if (chatInfo.lastMessageId === -1) {
  //       chatInfo.firstMessageId = -1;
  //     } else if (chatInfo.lastMessageId - this.numberMessages + 1 <= 0) {
  //       chatInfo.firstMessageId = 0;
  //     } else {
  //       chatInfo.firstMessageId = chatInfo.lastMessageId - this.numberMessages + 1;
  //     }
  //     // console.log(chatData.lastMessageId);
  //   });
  //
  //   database.ref('/chats/' + chatInfo.name + '/messages').limitToLast(this.numberMessages).on('value', (snapshot) => {
  //     messagesData = snapshot.val();
  //     // console.log(chatData.messages);
  //     console.log(messagesData);
  //   });
  //
  //   return [messagesData, chatInfo];
  // }

  getInitialMessagesData(chatInfo: any, numberMessages: number) {
    return firebase.database().ref('/chats/' + chatInfo.name + '/messages').limitToLast(numberMessages).once('value');
  }

  // getMessagesData() {
  //
  // }

  listenLastMessageId(chatInfo: any) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/chats/' + chatInfo.name + '/messagesCount').on('value', (data) => {
        resolve(data.val());
      });
    });

  }

  sendMessage(messageData: any, chatInfo) {
    if ((typeof messageData.message !== 'undefined') && (messageData.message!.search(/\S/g) !== -1)) {
      let database = firebase.database();
  //     database.ref('chats/' + chatInfo.chatName + '/lastMessageId').set(messageId);
      database.ref('chats/' + chatInfo.name + '/messages').push(messageData);
    }
  }
}
