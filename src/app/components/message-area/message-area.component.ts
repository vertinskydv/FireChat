import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../../shared/app-store';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit {
  public model$;
  public chatList$;
  public currentChatID$;
  public storeData;
  public currentMessages$;

  constructor(private ds: DataService,
              private _store: Store<AppStore>) {
    this.model$ = _store.select('chatState');
    this.currentChatID$ = this.model$.select('currentChatID');
    // this.chatList$ = this.model$.select('chatList');
    this.model$.subscribe( date => {
        this.storeData = date;
      }
    );

    this.currentChatID$.subscribe((ChatID) => {
      this.currentMessages$ = this.model$.select('messages').select(ChatID);
      console.log(ChatID);
    });
  }

  @HostListener("window:scroll", ['$event'])
  onScroll(event: any) {
    // console.log(event.srcElement.scrollTop);
    // console.log(event.srcElement.scrollTop);
    // console.log(event);
  }

  // getInitialMessages() {
  //   this.ds.getInitialMessagesData().subscribe(result => {
  //     // debugger;
  //     this.messagesDataArray = result;
  //     this.listenLastMessages();
  //   });
  // }
  //
  // listenLastMessages() {
  //   this.ds.listenLastMessages().subscribe((data) => {
  //     // debugger;
  //     this.messagesDataArray.concat(data);
  //   });
  // }

  ngOnInit() {
    // this.getInitialMessages();
  }

}
