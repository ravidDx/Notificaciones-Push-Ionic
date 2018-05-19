import { Component } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {OneSignal} from '@ionic-native/onesignal';
import { Identifiers } from '@angular/compiler';
import {Observable} from 'rxjs/Observable';

import {UsuariosProvider} from '../../providers/usuarios/usuarios';
import {Usuario} from '../../model/usuario/usuario.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  usuariosList=[]; 
  public notificacionesList: Array<string>; 

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              private oneSignal:OneSignal,
              private alertCtrl:AlertController,
              private usuarioListProvider:UsuariosProvider) 
  {

    usuarioListProvider.getUsuario().then((res:any)=>{
      this.usuariosList=res;
    })
    console.log(this.usuariosList);
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad home");
  }

  ionViewWillEnter(){
    let lctSorage = JSON.parse(localStorage.getItem("notificacionesJson"));
    //this.notificacionesList = lctSorage.data;
  }

  updateList(){
    console.log("update list");
    let lctSorage = JSON.parse(localStorage.getItem("notificacionesJson"));
    this.notificacionesList = lctSorage;   
  }

  
  //Send Notifications
    private makeNewNotification(userId:any){
      console.log(userId);
      userId = userId.replace(/['""]+/g,'');
      
      /*
      this.oneSignal.getIds().then((id)=>{
        
        let alert = this.alertCtrl.create({
          title: "Mensaje",
          subTitle: JSON.stringify(id.userId),
          buttons: ['OK']
        });
        alert.present();
   

      });
       */
        
        var body ={
          app_id: "bffaa631-614e-4065-a31d-0a51c8ce86e9",
          include_player_ids:[userId],
          contents:{
            en:"Nuevo Mensaje"
          },
          headings:{
            en:'Tienes un nuevo mensaje'
          }
        };
        this.http.post('https://onesignal.com/api/v1/notifications',body)
        .subscribe(data=>{
          console.log(data);
          let alert = this.alertCtrl.create({
            title: "Mensaje",
            subTitle: "exito",
            buttons: ['OK']
          });
          alert.present();

        },error=>{
          console.log(error);
          let alert = this.alertCtrl.create({
            title: "Mensaje",
            subTitle: "Error",
            buttons: ['OK']
          });
          alert.present();

        });

        
     

    
    }



}
