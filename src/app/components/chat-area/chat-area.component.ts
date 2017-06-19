import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { SELECT_CURRENT_CHAT, REFRESH_CHAT_LIST, UPDATE_CHAT_LIST_QUANTITY } from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppStore } from '../../shared/app-store';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {
  public model$;
  private chatDateIDList$;
  private chatIDListArray$;
  private currentChatID$;

  constructor(private _store: Store<AppStore>,
              private ds: DataService) {
    this.model$ = _store.select('chatState');
    this.chatDateIDList$ = this.model$.select('chatDateIDList');
    this.chatIDListArray$ = this.model$.select('chatIDListArray');
    this.currentChatID$ = this.model$.select('currentChatID');
  }

  getInitialChatList() {
    this.ds.getInitialChatList().subscribe(data => {
      let sortableData = this.sortChatListByTime(data);
      this._store.dispatch({type: REFRESH_CHAT_LIST, payload: sortableData});
      this._store.dispatch({type: UPDATE_CHAT_LIST_QUANTITY, payload: sortableData.length});
      this.listenChatList();
    });
  }

  sortChatListByTime(chatList) {
    let sortable = [];
    for (let chatKey in chatList) {
      sortable.push([chatKey, chatList[chatKey]]);
    }
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    return sortable;
  }


  listenChatList() {
    this.ds.listenChatList().subscribe(data => {
      let sortableData = this.sortChatListByTime(data);
      this._store.dispatch({type: REFRESH_CHAT_LIST, payload: sortableData});
      // debugger;
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
    this.getInitialChatList();
  }

}
