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
    this.ds.getInitialMessagesData().then(result => {
        this.messagesDataArray = result;
      this.listenNewMessages();
    });
  }

  listenNewMessages() {
    this.ds.listenLastMessages().subscribe((data) => {
      this.messagesDataArray = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.getInitialMessages();
  }

}
