import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'new-chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class AddNewChatDialog implements OnInit {

  errors = {
    name: false,
    members: false
  };

  dialogref: MdDialogRef<AddNewChatDialog>;
  nameValue: string;
  constructor(dialogRef: MdDialogRef<AddNewChatDialog> ) {
    this.dialogref = dialogRef;
  }

  onKeyUpName(value) {
    this.nameValue = value;
    if (value) {
      this.errors.name = false;
    }
  }

  onClickCancel() {
    this.dialogref.close();
  }

  onClickCreate() {
    debugger;
    if (this.nameValue.search(/\S/g) !== -1) {
      console.log('chat created!');
    } else {
      this.errors.name = true;
    }

  }

  ngOnInit() {
  }

}
