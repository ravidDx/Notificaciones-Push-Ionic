import { Component, ViewChild } from '@angular/core';
import { Platform , AlertController, NavParams, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {OneSignal} from '@ionic-native/onesignal';
import { HttpClient } from '@angular/common/http';

import {UsuariosProvider} from '../providers/usuarios/usuarios';
import {Usuario} from '../model/usuario/usuario.model';


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})



export class MyApp {
  rootPage:any = HomePage;
  notificacionesList: any =[];  
  
  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private oneSignal:OneSignal,
              private alertCtrl:AlertController,
              public http: HttpClient, 
              private usuarioListProvider:UsuariosProvider
              ) 
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
  
      this.handlerNotifications();
     
    });
  }

  
  //Listen Notifications
  private handlerNotifications(){
    
    this.oneSignal.startInit('bffaa631-614e-4065-a31d-0a51c8ce86e9', '511351370501');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      let alert = this.alertCtrl.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      //this.notificacionesList.push(jsonData.notification.payload.body);


      let objNotificacion={
        title:jsonData.notification.payload.title,
        msg:jsonData.notification.payload.body
      }
      this.notificacionesList.push(objNotificacion);
      let msg = this.notificacionesList;
      
      localStorage.setItem("notificacionesJson", JSON.stringify(msg));
    
    });
    this.oneSignal.endInit();

    this.oneSignal.getIds().then((id)=>{
      console.log(id);

      let usuario:Usuario={
        userId:JSON.stringify(id.userId),
        name:"usuario"
      };
      this.usuarioListProvider.addUsuario(usuario);

      let aler = this.alertCtrl.create({
        title: 'the onesignal ids object',
        message: JSON.stringify(id),
        buttons:[{
          text:'OK',
          role:'ok'
        }]
      });
      aler.present();
    
    });
  }


  
}


