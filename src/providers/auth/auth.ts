import { Injectable } from '@angular/core';

//for Angular FireBase Authentication
import { AngularFireAuth } from 'angularfire2/auth';
import { Events, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../../pages/login/login';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  HAS_LOGGED_IN = 'hasLoggedIn';
  public fireAuth: any;
constructor(public afAuth: AngularFireAuth,public events: Events,public storage: Storage) {this.fireAuth = firebase.auth();}

	loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
	  return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
	}

	resetPassword(email: string): firebase.Promise<any> {
    return this.fireAuth.sendPasswordResetEmail(email)
    .then(() => {
      //console.log('Reset Password Email Sent.');
      this.events.publish('resetPassword', 'Reset Password Email has been sent Successfully.');
    })
    .catch(() => {
      //console.log('Reset Password Email CANNOT Sent.');
      this.events.publish('resetPassword', 'Cannot send Reset Password Email for now.');
    });

	}

	logoutUser(): firebase.Promise<any> {
	  return this.afAuth.auth.signOut();
	}

	signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
	  return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
	}


  login(username: string, password: string): void {
      this.fireAuth.login({ email: username, password: password })
      .then((auth) => {
        console.log('Log In Successful, UID: ' + auth.uid + ', ' + 'Email: ' + username);
        this.storage.set('UID', auth.uid);
        this.storage.set('EMAIL', username);
        this.storage.set('PASSWORD', password);
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:login');
        //this.navCtrl.push(TabsPage);
      }).catch((err) => {console.log(err.message); this.events.publish('user:login_login.ts', err.message);});
  };

  signup(username: string, password: string): void {
    this.fireAuth.createUser({ email: username, password: password })
      .then((auth) => {
          this.storage.set('UID', auth.uid);
          this.storage.set('EMAIL', username);
          this.storage.set('PASSWORD', password);
          this.storage.set(this.HAS_LOGGED_IN, true);
          this.setUsername(username);
          this.events.publish('user:signup');
      })
      .catch((err) => {console.log(err.message); this.events.publish('user:signup_signup.ts', err.message);});
  };

  logout(): void {
    this.fireAuth.logout()
    .then(() => {
      this.storage.set('UID', '');
      this.storage.set('EMAIL', '');
      this.storage.set('PASSWORD', '');
      console.log('Log Out Successful');
      this.storage.remove(this.HAS_LOGGED_IN);
      this.storage.remove('username');
      this.events.publish('user:logout');
      //this.navCtrl.setRoot(LoginPage);
    })
    .catch((err) => console.log(err));
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  getUid(): Promise<string> {
    return this.storage.get('UID').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };
  

}
