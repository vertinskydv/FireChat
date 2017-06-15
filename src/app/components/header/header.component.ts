import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { DataService } from '../../services/data.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../shared/app-store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  private model$;

  @Output() onLoginStatusChange = new EventEmitter<any>();

  constructor(public afAuth: AngularFireAuth,
              private ds: DataService,
              private _store: Store<AppStore>) {
    this.model$ = _store.select('chatState');
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.translateLoginStatus();
  }

  translateLoginStatus() {
    this.onLoginStatusChange.emit(this.user);
  }

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.translateLoginStatus();
  }
}
