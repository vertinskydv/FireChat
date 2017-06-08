import { Component, OnInit } from '@angular/core';
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
