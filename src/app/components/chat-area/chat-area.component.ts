import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { SELECT_CURRENT_CHAT, REFRESH_CHAT_LIST, REFRESH_CHAT_LIST_ARRAY } from '../../store/actions';
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
  private chatListArray$;
  private currentChatID$;

  constructor(private _store: Store<AppStore>,
              private ds: DataService) {
    this.model$ = _store.select('chatState');
    this.chatList$ = this.model$.select('chatList');
    this.chatListArray$ = this.model$.select('chatListArray');
    this.currentChatID$ = this.model$.select('currentChatID');
  }

  listenChatList() {
    this.ds.listenChatList().subscribe(data => {
      this._store.dispatch({type: REFRESH_CHAT_LIST, payload: data});
    });
  }

  createNewChat() {
    let newChatID = this.ds.createNewChat();
    this._store.dispatch({type: SELECT_CURRENT_CHAT, payload: newChatID});
  }

  selectCurrentChat(event, chaiID: String) {
    this._store.dispatch({type: SELECT_CURRENT_CHAT, payload: chaiID});
  }

  ngOnInit() {
    this.listenChatList();
  }

}
