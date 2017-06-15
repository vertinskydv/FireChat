import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { SELECT_CURRENT_CHAT } from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppStore } from '../../shared/app-store';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {
  public model$;
  private chatList$;
  private storeData;

  constructor(private _store: Store<AppStore>,
              private ds: DataService) {
    this.model$ = _store.select('chatState');
    this.chatList$ = this.model$.select('chatList');
    // this.model$.subscribe( date => {
    //     this.storeData = date;
    //   }
    // );
    // this.chatList$.subscribe(this.onChangeChatList());

  }

  createNewChat() {
    let newChatID = this.ds.createNewChat();
    this._store.dispatch({type: SELECT_CURRENT_CHAT, payload: newChatID});
  }

  listenChatList() {
    this.ds.listenChatList().subscribe(data => {
      this._store.dispatch({type: CHANGE_LOGIN_STATUS, payload: data});
    });
  }

  // onChangeChatList() {
  //
  // }

  ngOnInit() {
  }

}
