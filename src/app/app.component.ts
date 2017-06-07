import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;
  userData: any;
  messageDataObj: any;
  messagesDataArray: any = [];
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
              private dataLoadingService: DataService) { }

  loginStatusChange(user: Observable<any>) {
    this.user = user;
    this.user.subscribe(data => {
      this.userData = data;
    });
  }





  // recalculateMessagesKeys(dataObj: any) {
    // debugger;
  //   let keys  = Object.keys(dataObj);
  //
  //   this.currentChatInfo.lastMessageId = keys[keys.length - 1];
  //   this.currentChatInfo.firstMessageId = keys[0];
  //   console.log(this.currentChatInfo.lastMessageId);
  //   console.log(this.currentChatInfo.firstMessageId);
  // };

  // getInitialMessagesData() {
  //   this.dataLoadingService.getInitialMessagesData(this.currentChatInfo, this.numberMessages).then(
  //     data => {
  //       // debugger;
  //       this.messageDataObj = data.val();
  //       this.messagesDataArray = this.objectToArray(data.val());
  //       this.recalculateMessagesKeys(data.val());
  //     }
  //   );
  // }




  // onGetNewMessageId(newId: any) {
  //   this.newLastMessageId = newId;
    // debugger;

    // console.log(this.newLastMessageId);
  // }/

  // listenLastMessageId() {
  //   this.dataLoadingService.listenLastMessageId(this.currentChatInfo).then(
  //     data => {
  //       this.onGetNewMessageId(data);
  //     }
  //   );
  // }


  ngOnInit() {

    // this.getInitialMessagesData();

  }
}
