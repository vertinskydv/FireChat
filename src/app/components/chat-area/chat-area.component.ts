import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { AppStore } from '../../shared/app-store';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {
  constructor(private ds: DataService) {


  }

  createNewChat() {
    this.ds.createNewChat();
  }


  ngOnInit() {
  }

}
