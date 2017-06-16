import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { DataService } from '../../services/data.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../shared/app-store';
import { CHANGE_LOGIN_STATUS, IMPLEMENT_STORE, CLEAR_STORE } from '../../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  private model$;

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
  }

  translateLoginStatus() {
    this.user.subscribe((data) => {
      if (data) {
        this._store.dispatch({type: IMPLEMENT_STORE});
        this._store.dispatch({type: CHANGE_LOGIN_STATUS, payload: data});
      } else {
        this._store.dispatch({type: CLEAR_STORE, payload: data});
      }
    });
  }

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.translateLoginStatus();
  }
}
