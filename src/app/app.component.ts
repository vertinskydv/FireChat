import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { provideStore, Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { DataService } from 'app/services/data.service';
import { ADD_NEW_CHAT, CHANGE_LOGIN_STATUS } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  public model;

  user: Observable<firebase.User>;
  userData: any;
  userChats: any;
  @ViewChild('messageBox')
  private messageBox: ElementRef;

  constructor(public afAuth: AngularFireAuth,
              private ds: DataService,
              private _store: Store<any>) {
    this.model = _store.select('chatState');
  }

  loginStatusChange(user: Observable<any>) {
    let self = this;
    user.subscribe(data => {
      self._store.dispatch({type: CHANGE_LOGIN_STATUS, payload: data});
      if (data.uid) {
        self.listenChatList(data.uid);

      }
    });
  }

  listenChatList(uid: String) {
    this.ds.getUserChatList(uid).subscribe();
  }

  addNewChat() {
    this._store.dispatch({type: ADD_NEW_CHAT, payload: 'chat2'});
  }

  getUserChatsInfo() {
    this.ds.getUserChatInfo(this.userData.uid).then((result) => {
      if (!result.val()) {
      }
    });
  }

  ngOnInit() {

  }
}
