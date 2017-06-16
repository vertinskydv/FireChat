import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { ADD_INITIAL_MESSAGES, IMPLEMENT_STORE } from './store/actions';
import { DataService } from 'app/services/data.service';
import { AppStore } from './shared/app-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  public model$;
  public chatListArray$;

  constructor(public afAuth: AngularFireAuth,
              private ds: DataService,
              private _store: Store<AppStore>) {
    this.model$ = _store.select('chatState');
    this.chatListArray$ = this.model$.select('chatListArray');
    this.chatListArray$.subscribe(this.getInitialMessages.bind(this));
    _store.dispatch({type: IMPLEMENT_STORE});
  }

  getInitialMessages(chatList) {
    if (chatList) {
      chatList.forEach((chatKey) => {
        this.ds.getInitialMessagesData(chatKey).subscribe(result => {
          // debugger;
          this._store.dispatch({type: ADD_INITIAL_MESSAGES, payload: { 'messagesObj': result, 'chatKey': chatKey}});
        });
      });
    }

  }

  listenLastMessages() {
    this.ds.listenLastMessages().subscribe((data) => {
      // debugger;
      // this.messagesDataArray.concat(data);
    });
  }

  // loginStatusChange(user: Observable<any>) {
  //   let self = this;
  //   user.subscribe(data => {
  //     self._store.dispatch({type: CHANGE_LOGIN_STATUS, payload: data});
  //     if (data.uid) {
  //       self.listenChatList(data.uid);
  //     }
  //   });
  // }

  // listenChatList(uid: String) {
  //   this.ds.getUserChatList(uid).subscribe((chatListObj) => {
  //     this._store.dispatch({type: UPDATE_CHAT_LIST, payload: chatListObj});
  //   });
  // }



  ngOnInit() {

  }
}
