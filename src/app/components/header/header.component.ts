import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { RootService } from '../../services/root.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [RootService]
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  userData: any;

  constructor(public afAuth: AngularFireAuth,
              private rs: RootService) { }


  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUserData () {
    this.user.subscribe(data => {
      this.userData = data;
    });
  }

  subscribeLogin() {
    this.rs.loginState(this.user);
  }

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.getUserData();
    this.subscribeLogin();
  }
}
