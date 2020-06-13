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
  public static finalUser = new Paciente();

  //url = "https://pps-tomas.000webhostapp.com/MisJuegos/juegos.php/login";

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //private ws: JuegoServiceService,
    public fireAuth : FirebaseAuth,
    public databaseConnection : DataBaseConnectionService) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  user = {
		email: "",
		password: ""
	}


  ngOnInit() {
  }


  setLoginValues(user, pass){
    console.log("user", user);

    this.user.email = user;
    this.user.password = pass;
  }

  Entrar() {
    console.log('entro', this.user);
    this.databaseConnection.login(this.user, LoginComponent.finalUser).then(res => {
      console.log("Success", res);
      this.router.navigate(['/Home']);
      localStorage.setItem('usuario', this.user.email);
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

  entrarTwo(user){
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

}
