# Notificaciones-Push-Ionic 
Implementacion de notificaciones push con OneSignal

PARTE A:  CONFIGURACIONES

1. Creamos un proyecto en Firebase el cual nos genera estas dos llaves: ( Google Server API Key ) y (Google Project Number.)
   Guia (https://documentation.onesignal.com/docs/generate-a-google-server-api-key)
   
   - Tener en cuenta estos parametros
        Server key -> Google Server API key
        Sender ID -> Google Project Number
 
2. creamos un proyecto en OneSignal, NOS GENERA LAS SIGUIENTES LLAVES (ONESIGNAL APP ID) Y (REST API KEY)
   Guia (https://blog.ng-classroom.com/blog/ionic2/ionic-and-onesignal/)
  
3. Creamos un proyecto en ionic
   - Instalamos los siguientes plugins
      ionic cordova plugin add onesignal-cordova-plugin
      npm install --save @ionic-native/onesignal
    
    - Para la conexion a la BD vamos a usar firebase
      debemos instalar estas dependecias
      npm install firebase angularfirebase2 --save
      Para poder hacer las respectivas configuraciones podemos guiarnos con este link
      Guia (https://blog.ng-classroom.com/blog/ionic2/firebase-angularfire-ionic/)
 


PARTE B: IMPLEMENTACION DE CODIGO
 
 1. Metodo handlerNotifications codificado en el componente llamado <app.component.ts>, es importante en este paso tener: 
     (App Id que nos dio OneSignal) y 
     (SenderID del remitente de Firebase.)
     
     Dentro de este metodo la linea mas importante es:
     this.oneSignal.startInit('App Id by OneSignal', 'Sender ID by Firebase');
     En nuestro caso sera
     this.oneSignal.startInit('528befa4-b101-425a-a86d-677de4c27ef1', '564553849534');
     
     Este Metodo sirve para escuchar cualquier notificacion que llegue.
     
  2. Nos creamos un provider con el metodo addUsuario()[]
     Este añade el token del dispositivo a la BD firebase
  
  3. El metodo private makeNewNotification(userId:any){} permite enviar notificaciones al id del dispositivo indicado.}  
     Metodo codificado en home.ts
     El metodo hace una peticion post al api de onesignal
     el parametro include_player_ids:[userId] nos permite indicar a q dispositivo se enviara la notificacion

     
     



   
