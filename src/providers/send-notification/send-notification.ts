import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SendNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SendNotificationProvider {
  

  constructor(public http: HttpClient) {
    console.log('Hello SendNotificationProvider Provider');
  }

  
  sendIonicPush(){
    return this.http.get('http://port-3000.api-raulbastidas654549.codeanyapp.com/Notificacion/sendPush');
  
  }
  

  
  

}
