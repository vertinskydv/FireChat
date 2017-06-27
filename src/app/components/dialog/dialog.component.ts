import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'new-chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class AddNewChatDialog implements OnInit {

  constructor(dialogRef: MdDialogRef<AddNewChatDialog> ) { }

  ngOnInit() {
  }

}
