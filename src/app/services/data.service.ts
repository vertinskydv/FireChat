import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { AppStore } from '../shared/app-store';

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

  public model;
  public storeData;

  constructor(private _store: Store<AppStore>) {
    _store.select('chatState').subscribe( date => {
        this.model = date;
      }
    );
  }

  sendMessage(message: any) {
    let messageData = {
      'message': message,
      'userId': this.userData.uid,
      'time': Date.now()
    };
    firebase.database().ref('chats/' + this.currentChatInfo.name + '/messages').push(messageData);
  }

  getUserChatList(uid: String) {
    return Observable.create((observer) => {
      firebase.database().ref('/users/' + uid + '/chats').on('value', (snapshot) => {
        observer.next(snapshot.val());
      });
    });
  }

  createNewChat() {
    let newChatID = firebase.database().ref('chats').push({'users': this.model.user.uid}).key;
    console.log(newChatID);
    firebase.database().ref('users/' + this.model.user.uid + '/chats/').update({[newChatID]: newChatID});
    return newChatID;
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
      let firstConnection: boolean = true;
      createConnection();
      function createConnection () {
        firstConnection = true;
        firebase.database().ref('/chats/chat1/messages').orderByKey().startAt(self.currentChatInfo.lastMessageId).on("value", obsCallback);
      }

      function removeConnection() {
        firebase.database().ref('/chats/chat1/messages').orderByKey().startAt(self.currentChatInfo.lastMessageId).off("value", obsCallback);
      }

      function obsCallback(snapshot) {
        if (!firstConnection) {
          let newMessagesObj = snapshot.val();
          if (newMessagesObj) {
            let newMessagesArr = self.formatNewMessagesToArray(newMessagesObj);
            observer.next(newMessagesArr);
            removeConnection();
            self.getMessagesKeys();
            createConnection();
          }
        } else {
          firstConnection = false;
        }
      }
    });
  }

  getUserChatInfo(uid) {
    return firebase.database().ref('/userChats/' + uid).orderByKey().equalTo('chat1').once('value');
  }
}
