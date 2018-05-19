import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';
import firebase from 'firebase';
import {Usuario} from '../../model/usuario/usuario.model';
import { snapshotChanges } from 'angularfire2/database';
/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  users=[]
  firebase2 = firebase.database().ref('/usuarios');

  constructor(public http: HttpClient,
              public db:AngularFireDatabase) {
    console.log('Hello UsuariosProvider Provider');
  }

  public getUsuario(){
     //return this.db.list('usuarios/');
     var promise = new Promise((resolve, reject)=>{
       this.firebase2.orderByChild('userId').once('value', (snapshot) =>{
         let userId = snapshot.val();
         let user=[];
         for(var key in userId){
            user.push(userId[key])
         }
         resolve(user)
        
       }).catch((err)=>{
         reject(err);
       })
     })
     return promise;
  }
  

  public addUsuario(usuario:Usuario){
    this.db.database.ref('usuarios/'+usuario.userId).set(usuario);
  }

}
