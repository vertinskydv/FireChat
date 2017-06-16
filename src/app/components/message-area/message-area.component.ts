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
  public currentChatID$;
  public storeData;
  public currentMessages$;

  constructor(private ds: DataService,
              private _store: Store<AppStore>) {
    this.model$ = _store.select('chatState');
    this.currentChatID$ = this.model$.select('currentChatID');
    this.model$.subscribe( data => {
        this.storeData = data;
      }
    );

    this.currentChatID$.subscribe((ChatID) => {
      this.currentMessages$ = this.model$.select('chat').select(ChatID).select('messages');
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
