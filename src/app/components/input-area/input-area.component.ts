import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss']
})
export class InputAreaComponent implements OnInit {
  dialedMessage: string = '';

  constructor(private ds: DataService) { }

  sendMessage(message: string) {
    if ((typeof message !== 'undefined') && (message!.search(/\S/g) !== -1)) {
      this.ds.sendMessage(message);
      this.dialedMessage = '';
    }
  }


  ngOnInit() {
  }

}
