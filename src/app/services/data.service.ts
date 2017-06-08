import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class DataService {
  messagesDataArray: Array<any>;
  messageDataObj: any;
  userData: any;
  numberMessages: number = 30;
  currentChatInfo = {
    'name': 'chat1',
    'lastMessageId': '',
    'firstMessageId': '',
  };

  constructor() { }

  sendMessage(message: any) {
    let messageData = {
      'message': message,
      'userId': this.userData.uid,
      'time': Date.now()
    };
    firebase.database().ref('chats/' + this.currentChatInfo.name + '/messages').push(messageData);
  }

  listenUserData (userdata) {
    this.userData = userdata;
  }

  formatInitialMessagesToArray(obj: any) {
    let result = [];
    for (let key in obj) {
      result.push(obj[key]);
    }
    return result;
  }

  formatNewMessagesToArray(obj: any) {
    let count = 0;
    let result = [];
    for (let key in obj) {
      if (count !== 0) {
        this.messageDataObj[key] = obj[key];
        this.messagesDataArray.push(obj[key]);
        result.push(obj[key]);
      }
      count++;
    }
    return result;
  }

  getInitialMessagesData() {
    let self = this;
    return Observable.create((observer) => {
      firebase.database().ref('/chats/' + this.currentChatInfo.name + '/messages').limitToLast(this.numberMessages).on('value', obsCallback);
      function obsCallback (snapshot) {
        self.messageDataObj = snapshot.val();
        if (self.messageDataObj) {
          self.messagesDataArray = self.formatInitialMessagesToArray(self.messageDataObj);
          firebase.database().ref('/chats/' + self.currentChatInfo.name + '/messages').limitToLast(self.numberMessages).off('value', obsCallback);
          self.getMessagesKeys();
          observer.next(self.messagesDataArray);
        }
      }
    });

  }

  getMessagesKeys() {
    let keys  = Object.keys(this.messageDataObj);
    this.currentChatInfo.firstMessageId = keys[0];
    this.currentChatInfo.lastMessageId = keys[keys.length - 1];
  }


  listenLastMessages() {
    let self  = this;
    return Observable.create((observer) => {
      firebase.database().ref('/chats/chat1/messages').orderByKey().startAt(self.currentChatInfo.lastMessageId).on("value", function (snapshot) {
        let newMessagesObj = snapshot.val();
        if (newMessagesObj) {
          let newMessagesArr = self.formatNewMessagesToArray(newMessagesObj);
          self.getMessagesKeys();
          observer.next(newMessagesArr);
        }
      });
    });
  }


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
}
