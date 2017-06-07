import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  userData: any;

  @Output() onLoginStatusChange = new EventEmitter<any>();

  constructor(public afAuth: AngularFireAuth,
              public ds: DataService) { }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    this.translateLoginStatus();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.translateLoginStatus();
  }

  translateLoginStatus() {
    this.onLoginStatusChange.emit(this.user);
    this.user.subscribe((data) => {
      this.ds.listenUserData(data);
    });
  }



  // getUserData () {
  //   this.user.subscribe(data => {
  //     // this.userData = data;
  //   });
  // }

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.translateLoginStatus();
  }
}
