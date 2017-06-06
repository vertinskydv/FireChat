import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DataLoadingService } from 'app/services/data-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataLoadingService]
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;
  userData: any;
  messageDataObj: any;
  messagesDataArray: any = [];
  dialedMessage: string = '';
  numberMessages: number = 30;

  newLastMessageId: any;
  currentChatInfo = {
    'name': 'chat1',
    'lastMessageId': '',
    'firstMessageId': '',
  };



  @ViewChild('messageBox')
  private messageBox: ElementRef;

  constructor(public afAuth: AngularFireAuth,
              private dataLoadingService: DataLoadingService) {
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
    });
  }

  sendMessage(message: string) {
    let messageData = {
      'message': message,
      'userId': this.userData.uid,
      'time': Date.now()
    };
    this.dataLoadingService.sendMessage(messageData, this.currentChatInfo);
    this.dialedMessage = '';
  }


   objectToArray(obj) {
    let result = [];
    for (let key in obj) {
      result.push(obj[key]);
    }
    return result;
  }

  recalculateMessagesKeys(dataObj: any) {
    // debugger;
    let keys  = Object.keys(dataObj);

    this.currentChatInfo.lastMessageId = keys[keys.length - 1];
    this.currentChatInfo.firstMessageId = keys[0];
    console.log(this.currentChatInfo.lastMessageId);
    console.log(this.currentChatInfo.firstMessageId);
  };

  getInitialMessagesData() {
    this.dataLoadingService.getInitialMessagesData(this.currentChatInfo, this.numberMessages).then(
      data => {
        // debugger;
        this.messageDataObj = data.val();
        this.messagesDataArray = this.objectToArray(data.val());
        this.recalculateMessagesKeys(data.val());
      }
    );
  }

  recalculateCurrentChatInfo() {

  }


  onGetNewMessageId(newId: any) {
    this.newLastMessageId = newId;
    // debugger;

    console.log(this.newLastMessageId);
  }

  listenLastMessageId() {
    this.dataLoadingService.listenLastMessageId(this.currentChatInfo).then(
      data => {
        this.onGetNewMessageId(data);
      }
    );
  }


  ngOnInit() {
    // this.user = this.afAuth.authState;
    // this.getUserData();
    // this.listenLastMessageId();
    this.getInitialMessagesData();
  }
}
