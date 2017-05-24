import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<any>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(public af: AngularFire) {
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });

    this.

    this.user = this.afAuth.authState;
  }

  login() {
    debugger;
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  Send(desc: string) {
    this.items.push({ message: desc});
    this.msgVal = '';
  }
}
