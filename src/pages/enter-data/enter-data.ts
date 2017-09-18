import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { NavController, NavParams, MenuController, ItemSliding } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { DataDetailPage } from '../data-detail/data-detail';

@Component({
  selector: 'page-enter-data',
  templateUrl: 'enter-data.html'
})
export class EnterDataPage {
  selectedItem: any;
  data: {name?: string, text?: string} = {};
  //items: FirebaseListObservable<any[]>;
  theItems: FirebaseListObservable<any[]>;
  uid: string;
  submitted = false;
  message: any;

  constructor(public storage: IonicStorageModule, public navCtrl: NavController,
    public navParams: NavParams, public af: AngularFireDatabase, menuCtrl: MenuController,
    public userData: AuthProvider) {
      this.message = '';
      //this.items = af.database.list('/data');
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

  saveData(form: NgForm) {
    this.submitted = true;
	this.userData.getUid().then((uid) => {
      this.uid = uid;
      this.theItems = this.af.list('/data' + '/' + this.uid);
	  if (form.valid) {
      this.theItems.push({ name: this.data.name, text: this.data.text })
      .then((val) => {
        this.message = 'Item Saved.';
      })
      .catch((err) => {
        console.log(err);
        this.message = 'Cannot Save The Item.';
      });
    }
    });
	

  }

  openPage(item: any){
    this.navCtrl.push(DataDetailPage, item);
  }

}
