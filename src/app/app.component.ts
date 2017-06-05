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
  chatData: any;
  dialedMessage: string = '';
  currentChatName: string = 'chat1';
  numberMessages: number = 30;


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
    this.dataLoadingService.sendMessage(message, this.currentChatName, this.userData.uid);
    this.dialedMessage = '';
  }


  ngOnInit() {
    this.user = this.afAuth.authState;
    this.getUserData();
    this.chatData = this.dataLoadingService.listenChatData(this.currentChatName, this.numberMessages);
  }
}
