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

  formatMessagesToArray(obj: any) {
    let result = [];
    for (let key in obj) {
      result.push(obj[key]);
    }
    return result;
  }

  getInitialMessagesData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/chats/' + this.currentChatInfo.name + '/messages').limitToLast(this.numberMessages).once('value')
        .then(data => {
          this.messageDataObj = data.val();
          this.messagesDataArray = this.formatMessagesToArray(this.messageDataObj);
          this.getMessagesKeys();
          resolve(this.messagesDataArray);
        });
    });
  }

  getMessagesKeys() {
    let keys  = Object.keys(this.messageDataObj);
    this.currentChatInfo.firstMessageId = keys[0];
    this.currentChatInfo.lastMessageId = keys[this.messagesDataArray.length - 1];
  }


  listenLastMessages() {
    return Observable.create((observer) => {
      firebase.database().ref('/chats/chat1/messages').orderByKey().startAt(this.currentChatInfo.lastMessageId).on("value", function (snapshot) {
        let newMessagesObj = snapshot.val();
        let newMessagesArr = this.formatMessagesToArray(snapshot.val());
        this.messageDataObj.assign(newMessagesObj);
        this.messagesDataArr.push()

        observer.next(this.messagesDataArr);
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
