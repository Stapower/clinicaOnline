import { CaptchaValidationService } from './../../services/captcha-validation.service';
import { HomeComponent } from './../home/home.component';
import { Paciente } from './../../clases/paciente';
import { DataBaseConnectionService } from './../../services/database-connection.service';
import { Component, EventEmitter, Input, OnInit, Output, NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { Subscription } from "rxjs";
//import {TimerObservable} from "rxjs/observable/TimerObservable";
//import {JuegoServiceService} from "../../servicios/juego-service.service";
//import {FirebaseAuth} from '../../clases/firebase-auth'
import { FirebaseAuth } from '../../clases/firebase-auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  //usuario = 'Pepito';
  //clave= '123456';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  Mensajes: string;
  public static finalUser = [];

  //url = "https://pps-tomas.000webhostapp.com/MisJuegos/juegos.php/login";

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //private ws: JuegoServiceService,
    public fireAuth : FirebaseAuth,
    public databaseConnection : DataBaseConnectionService,
    public captchaService : CaptchaValidationService) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  user = {
		email: "",
		password: ""
  }
  
  captchaResponse;

  public static userEmail;

  ngOnInit() {
  }


  setLoginValues(user, pass){
    console.log("user", user);

    this.user.email = user;
    this.user.password = pass;
  }

  Entrar() {

    if(this.captchaResponse != null){
      var x = this.captchaService.validateCaptcha(this.captchaResponse);
      console.log(x);
      if(x != true){
        this.MostarMensaje("Error en el servicio, reintentar captcha");
      }
    }
    else{
      this.MostarMensaje("El captcha no fue completado");
      return;
    }

    console.log('entro', this.user);
    LoginComponent.userEmail = this.user;
    sessionStorage.setItem("email", this.user.email);
    console.log('email', this.user.email);
    this.databaseConnection.login(this.user, LoginComponent.finalUser).then(res => {
      console.log("Success", res);
      //localStorage.setItem('cliente', this.user.email);
      //HomeComponent.loggedUser = LoginComponent.finalUser;
      this.router.navigate(['/Home']);
    })
    .catch(err => {
      this.MostarMensaje(err.message);
      console.log("Failed", err.message);
    });


    
		//this.router.navigate(['/tabs/tab1']);

    
    /*if (this.usuario === 'admin' && this.clave === 'admin') {
      this.router.navigate(['/Principal']);
    }*/
  }

  entrarTwo(user, finalUser){
    this.user = user;
    this.Entrar();
  }

  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
		this.Mensajes = mensaje;
		var x = document.getElementById("snackbar");
		if (ganador) {
			x.className = "show Ganador";
		} else {
			x.className = "show Perdedor";
		}
		var modelo = this;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
		console.info("objeto", x);
	}

  /*MoverBarraDeProgreso() {
    
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="Iniciando Sesion..."; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      console.log("inicio");
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Verificando..."; 
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje="Adjustando encriptación.."; 
          break;        
        case 100:
        this.progresoMensaje="Listo!";
          console.log("final");
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }     
    });
    //this.logeando=true;
  }
*/
resolved(captchaResponse: string, res) {
  console.log(`Resolved response token: ${captchaResponse}`);
  this.captchaResponse = captchaResponse;
}

/*validateToken(){
  const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`
  if(token === null || token === undefined){
    res.status(201).send({success: false, message: "Token is empty or invalid"})
    return console.log("token empty");
    body = JSON.parse(body);

    request(url, function(err, response, body){
      //the body is the data that contains success message
      body = JSON.parse(body);
      
      //check if the validation failed
      if(body.success !== undefined && !data.success){
           res.send({success: false, 'message': "recaptcha failed"});
           return console.log("failed")
       }
      
      //if passed response success message to client
       res.send({"success": true, 'message': "recaptcha passed"});
      
    })
  
  })

  }
}*/


}
