import { Component, OnInit, HostListener } from '@angular/core';
import * as firebase from 'firebase/app';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit {
  messagesDataArray: any = [];

  constructor(private ds: DataService) { }

  @HostListener("window:scroll", ['$event'])
  onScroll(event: any) {
    // console.log(event.srcElement.scrollTop);
    // console.log(event.srcElement.scrollTop);
    // console.log(event);
  }

  getInitialMessages() {
    this.ds.getInitialMessagesData().subscribe(result => {
      // debugger;
      this.messagesDataArray = result;
      this.listenLastMessages();
    });
  }

  listenLastMessages() {
    this.ds.listenLastMessages().subscribe((data) => {
      // debugger;
      this.messagesDataArray.concat(data);
    });
  }

  ngOnInit() {
    this.getInitialMessages();
  }

}
