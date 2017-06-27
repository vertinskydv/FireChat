import { NgModule } from '@angular/core';

import {MdButtonModule, MdCheckboxModule, MdInputModule, MdIconModule, MdProgressBarModule, MdDialogModule } from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule,
    MdProgressBarModule,
    MdDialogModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule,
    MdProgressBarModule,
    MdDialogModule
  ],
})
export class MaterialModule { }
