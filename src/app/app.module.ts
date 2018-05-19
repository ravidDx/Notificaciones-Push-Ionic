import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {OneSignal} from '@ionic-native/onesignal';
import { SendNotificationProvider } from '../providers/send-notification/send-notification';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database/';
import {AngularFireAuthModule} from 'angularfire2/auth';

//import {firebaseConfig} from './firebase.credentials';
import { UsuariosProvider } from '../providers/usuarios/usuarios';

export const firebaseConfig={
  apiKey: "AIzaSyAgkZ9Pkn_mcXdaWL4R0ChcKHB2zVQnjsQ",
  authDomain: "onesignalexample-39f02.firebaseapp.com",
  databaseURL: "https://onesignalexample-39f02.firebaseio.com",
  //projectId: "onesignalexample-39f02",
  storageBucket: "onesignalexample-39f02.appspot.com",
  messagingSenderId: "511351370501"
}


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SendNotificationProvider,
    UsuariosProvider
  ]
})
export class AppModule {}
