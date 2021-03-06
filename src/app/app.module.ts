import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
//pages here
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPage } from '../pages/signup/signup';
import { SignupPageModule } from '../pages/signup/signup.module';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
// Importing AF2 Module

 import {IonicStorageModule} from '@ionic/storage';
import {  MapData } from '../providers/map-data';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { HttpModule } from '@angular/http';
// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyBYFVD-FZPs46zvPj_M1jdBoVZl4JaLxRQ",
    authDomain: "ag4test-fedb5.firebaseapp.com",
    databaseURL: "https://ag4test-fedb5.firebaseio.com",
    projectId: "ag4test-fedb5",
    storageBucket: "ag4test-fedb5.appspot.com",
    messagingSenderId: "616842499614"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(), //name: '__mydb',driverOrder: ['indexeddb', 'sqlite', 'websql']
    AngularFireAuthModule,
    LoginPageModule,
    SignupPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    LoginPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},IonicStorageModule,
    SplashScreen,
    StatusBar,
    AuthProvider,
    Camera,
    MapData

  ]
})
export class AppModule {}
