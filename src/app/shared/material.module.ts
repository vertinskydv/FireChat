import { NgModule } from '@angular/core';

import {MdButtonModule, MdCheckboxModule, MdInputModule, MdIconModule} from '@angular/material';



@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule
  ],
})
export class MaterialModule { }
