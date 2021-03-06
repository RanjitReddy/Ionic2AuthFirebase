import { Component } from '@angular/core';

import { ViewController, NavController, App, ModalController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="delete()">Delete</button>
    </ion-list>
  `
})
export class DataPopoverPage {
  data: any;
  uid: any;
  theItems: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public userData: AuthProvider
  ) {
    this.data = navParams.data;
    console.log(this.data.data.$key);
    console.log(this.data.data.name);
  }

  delete() {
    this.userData.getUid().then((uid) => {
      this.uid = uid;
      this.theItems = this.af.list('/items' + '/' + this.uid);
      this.theItems.remove(this.data.data.$key).then(() => {
        console.log('Deleted Item with name: ' + this.data.data.name + ', key: ' + this.data.data.$key);
        this.navCtrl.setRoot(TabsPage);
      });
    });

  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}
