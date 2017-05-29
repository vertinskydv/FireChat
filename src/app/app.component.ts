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
  currentMessage: string;

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

  sendMessage(message) {
    if (this.chatData.lastMessageId === -1) {
      let messageId = this.chatData['lastMessageId'] += 1;
        firebase.database().ref('chats/chat1/messages').set({
          [messageId] : message
        });
    }

    // firebase.database().ref('chats/chat1/messages').set({
    //   'message': message
    // });
    // firebase.database().ref('chats/chart1/').set({
    //   'lastMessgeId': this.chatData['lastMessageId'] += 1
    // });
  }

  getChatData() {
    firebase.database().ref('/chats/chat1').once('value').then((snapshot) => {
      this.chatData = snapshot.val();
    });
  }

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.getUserData();
    this.getChatData();
  }
}
