import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;
  userData: any;
  chatData: any;
  dialedMessage: string = '';
  currentChatName: string = 'chat1';

  constructor(public afAuth: AngularFireAuth) {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUserData () {
    this.user.subscribe(data => {
      this.userData = data;
      // console.log(data);
    });
  }

  sendMessage(message?: string) {
    if ((typeof message !== 'undefined') && (message!.search(/\S/g) !== -1)) {
      let updates = {},
          lastMessageId = this.chatData.lastMessageId,
          messageId = lastMessageId + 1;

      updates['/chats/' + this.currentChatName + '/lastMessageId'] = messageId;
      updates['chats/' + this.currentChatName + '/messages/' + messageId] = message;
      firebase.database().ref().update(updates);
      this.dialedMessage = '';
    }
  }

  listenChatData(chatName: string) {
    let chatData: any = {},
        database = firebase.database();

    database.ref('/chats/' + chatName + '/lastMessageId').on('value', (snapshot) => {
      chatData.lastMessageId = snapshot.val();
      // console.log(chatData.lastMessageId);
    });

    database.ref('/chats/' + chatName + '/messages').on('value', (snapshot) => {
      chatData.messages = snapshot.val();
      // console.log(chatData.messages);
    });

  }

  getInitialChatData(chatName: string) {
    let chatData: any = {},
        database = firebase.database();
    database.ref('/chats/' + chatName + '/lastMessageId').once('value').then((snapshot) => {
      chatData.lastMessageId = snapshot.val();
      console.log(chatData.lastMessageId);
    });

    database.ref('/chats/' + chatName + '/messages').limitToLast(5).once('value').then((snapshot) => {
      chatData.messages = snapshot.val();
      console.log(chatData.messages);
    });


  }

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.getUserData();
    this.getInitialChatData(this.currentChatName);
    this.listenChatData(this.currentChatName);
  }
}
