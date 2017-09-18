import { Component,ViewChild } from '@angular/core';
import { Platform , Nav ,NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild('content') nav: NavController;
  rootPage: any = HomePage;  
  constructor(platform: Platform, afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen) {
    // to check whether the user is authenticated 
    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.nav.setRoot('LoginPage');
        authObserver.unsubscribe();
      }
    });
     
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  go_to_home(Page){
    this.nav.setRoot(HomePage);
  }
 
  go_to_login(){
    this.nav.setRoot(LoginPage);  
  }
 
  go_to_signup(){
    this.nav.setRoot(SignupPage);
  }

}

