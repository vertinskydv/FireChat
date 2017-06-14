import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { DataService } from 'app/services/data.service';
import { ADD_NEW_CHAT, CHANGE_LOGIN_STATUS, UPDATE_CHAT_LIST } from './store/actions';
import { AppStore } from './shared/app-store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  public model;

  constructor(public afAuth: AngularFireAuth,
              private ds: DataService,
              private _store: Store<AppStore>) {
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
    this.ds.getUserChatList(uid).subscribe((chatListObj) => {
      this._store.dispatch({type: UPDATE_CHAT_LIST, payload: chatListObj});
    });
  }

  ngOnInit() {

  }
}
