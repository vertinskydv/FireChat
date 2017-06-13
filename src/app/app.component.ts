import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import {provideStore, Store} from '@ngrx/store';
import * as firebase from 'firebase/app';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;
  userData: any;
  userChats: any;
  @ViewChild('messageBox')
  private messageBox: ElementRef;

  constructor(public afAuth: AngularFireAuth,
              private ds: DataService,
              _store: Store<any>) { }

  loginStatusChange(user: Observable<any>) {
    let self = this;
    this.user = user;

    this.user.subscribe(data => {
      this.userData = data;
      if (this.userData) {
        self.getUserChatsInfo();
      }
    });
  }

  getUserChatsInfo() {
    this.ds.getUserChatInfo(this.userData.uid).then((result) => {
      if (!result.val()) {

      }
    });

  }

  ngOnInit() {}
}
