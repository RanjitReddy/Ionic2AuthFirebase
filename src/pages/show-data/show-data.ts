import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { NavController, NavParams, MenuController, ItemSliding } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { DataDetailPage } from '../data-detail/data-detail';

@Component({
  selector: 'page-show-data',
  templateUrl: 'show-data.html'
})
export class ShowDataPage {

  selectedItem: any;
  data: {name?: string, text?: string} = {};
  items: FirebaseListObservable<any[]>;
  theItems: FirebaseListObservable<any[]>;
  uid: string;
  submitted = false;

  constructor(public storage: IonicStorageModule, public navCtrl: NavController,
    public navParams: NavParams, public af: AngularFireDatabase, menuCtrl: MenuController,
    public userData: AuthProvider) {

    this.items = af.list('/data');
    this.selectedItem = navParams.get('item');
    //this.getUid();
  }

  ngAfterViewInit() {
    this.getUid();
  }

  getUid() {
    this.userData.getUid().then((uid) => {
      this.uid = uid;
      this.theItems = this.af.list('/data' + '/' + this.uid);
    });
  }

  openPage(item: any){
    this.navCtrl.push(DataDetailPage, item);
  }

  delete(slidingItem: ItemSliding, item: any) {
      this.theItems.remove(item.$key).then(() => {
        console.log('Deleted Item with name: ' + item.name + ', key: ' + item.$key);
        slidingItem.close();
      });
  }
}
