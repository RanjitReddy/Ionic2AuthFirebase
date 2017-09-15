import { Component } from '@angular/core';

import { AlertController, NavController, Events } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;

  constructor(
    public alertCtrl: AlertController,
    public nav: NavController,
    public userData: AuthProvider,
    public events: Events) {
    //console.log(this.nav.getActive());
    this.events.subscribe('resetPassword', (data: any) => {
      console.log(data);
      this.presentAlert(data);
    });
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    this.userData.resetPassword(this.username);
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }

  presentAlert(alertText: any) {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: alertText,
      buttons: ['Ok']
    });
    alert.present();
  }
}
