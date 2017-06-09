import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss']
})
export class InputAreaComponent implements OnInit {
  dialedMessage: string = '';
  @ViewChild('textarea')
  input: ElementRef;

  constructor(private ds: DataService) { }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.ctrlKey){
      this.sendMessage(this.dialedMessage);
    }
  }

  sendMessage(message: string) {
    if ((typeof message !== 'undefined') && (message!.search(/\S/g) !== -1)) {
      this.input.nativeElement.focus();
      this.ds.sendMessage(message);
      this.dialedMessage = '';
    }
  }

  ngOnInit() {
  }

}
