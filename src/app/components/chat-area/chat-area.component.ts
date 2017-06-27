import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { MdDialog } from '@angular/material';
import { AddNewChatDialog } from '../dialog/dialog.component';
import { SELECT_CURRENT_CHAT,
         REFRESH_CHAT_LIST,
         SET_INITIAL_CHATLIST_VALUE,
         CHAT_LIST_ITEM_CHANGE,
         CHAT_LIST_ITEM_ADD,
         EXPAND_CHAT_LIST} from '../../store/actions';
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
  private chatItemsLoading:boolean = false;


  constructor(private _store: Store<AppStore>,
              public dialog: MdDialog,
              private ds: DataService) {
    this.model$ = _store.select('chatState');
    this.chatDateIDList$ = this.model$.select('chatDateIDList');
    this.chatIDListArray$ = this.model$.select('chatIDListArray');
    this.currentChatID$ = this.model$.select('currentChatID');
  }

  onScroll(event: any) {
    if (event.target.scrollHeight === event.target.offsetHeight + event.target.scrollTop) {
      this.chatItemsLoading = true;
      this.ds.expandChatList().then(data => {
        let sortableData = this.sortChatListByTime(data.val());
        this._store.dispatch({type: EXPAND_CHAT_LIST, payload: sortableData});
        this.chatItemsLoading = false;
      });
    }
  }

  listenChatListChanges() {
    this.ds.listenChatListNewChat().subscribe(data => {
      this._store.dispatch({type: CHAT_LIST_ITEM_ADD, payload: data});
    });
    this.ds.listenChatListUpdate().subscribe(data => {
      this._store.dispatch({type: CHAT_LIST_ITEM_CHANGE, payload: data});
    });
  }

  createNewChat() {
    let dialogRef = this.dialog.open(AddNewChatDialog)
    let newChatID = this.ds.createNewChat();
    this._store.dispatch({type: SELECT_CURRENT_CHAT, payload: newChatID});
  }

  selectCurrentChat(event, chaiID: String) {
    this._store.dispatch({type: SELECT_CURRENT_CHAT, payload: chaiID});
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

  ngOnInit() {
    this.listenChatListChanges();
  }

}
