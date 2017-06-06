import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class RootService {
  user: Observable<firebase.User>;

  constructor() { }


  loginState(user) {
    this.user = user;
  }

  getLoginState() {

  }
}
