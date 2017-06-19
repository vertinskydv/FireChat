import { NgModule } from '@angular/core';

import {MdButtonModule, MdCheckboxModule, MdInputModule, MdIconModule, MdProgressBarModule } from '@angular/material';



@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule,
    MdProgressBarModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule,
    MdProgressBarModule
  ],
})
export class MaterialModule { }
