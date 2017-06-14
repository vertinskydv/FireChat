import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { ScrollToBottomDirective } from './directives/scroll-to-bottom.directive';
import { InfiniteScrollerDirective } from './directives/infinite-scroller.directive';
import { MessageAreaComponent } from './components/message-area/message-area.component';
import { InputAreaComponent } from './components/input-area/input-area.component';
import { HeaderComponent } from './components/header/header.component';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';

import { chatState } from './store/dispatchers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    ScrollToBottomDirective,
    InfiniteScrollerDirective,
    MessageAreaComponent,
    InputAreaComponent,
    HeaderComponent,
    ChatAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.provideStore({ chatState: chatState }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
