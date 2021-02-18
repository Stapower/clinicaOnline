import { Paciente } from './../../clases/paciente';
import { DataBaseConnectionService } from './../../services/database-connection.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, CanActivate } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations'
//import {TranslateService} from '@ngx-translate/core';

//import { ..., GoogleObj } from "./models/solution";
import { GoogletranslateService, GoogleObj } from "../../services/googletranslate/googletranslate.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
	trigger(
	  'inOutAnimation', 
	  [
		transition(
		  ':enter', 
		  [style({ width: 2000, opacity: 0 }),
			animate('1s ease-in', 
					style({ width: 2000, opacity: 1 }))
			
		  ]
		),
		transition(
		  ':leave', 
		  [
			style({ height: 0, opacity: 0 }),
			animate('1s ease-out', 
					style({ height: 300, opacity: 1 }))
		  ]
		)
	  ]
	)
  ]
})
export class HomeComponent implements OnInit, OnDestroy, CanActivate {

  constructor(	private router: Router, 
				private databaseConnection: DataBaseConnectionService,
				//private translate: TranslateService,
				private google: GoogletranslateService
	) {
        //translate.setDefaultLang('en');

		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			// If it is a NavigationEnd event re-initalise the component
				console.log("RelaodUserrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", e);
				if(e.url != null)
				{
					var email = e.url.split('=')[1];

				}
			  	this.reloadUser2(email);
		  });
	
		}

	canActivate() {
		// If the user is not logged in we'll send them back to the home page
		if (sessionStorage.getItem('email') == null) {
			console.log('No estás logueado');
			this.router.navigate(['/']);
			return false;
		}

		return true;
	}

	leng = "ES";

	lenguage(v){
		this.leng = v;
	}
	
	translateNow(){

		const googleObj: GoogleObj = {
			q: ["hello"],
			target: "es",
			source: "en",
			format :"plain-text",
			model : "base"
		};

		//this.translateBtn.disabled = true;
		this.google.translate(googleObj).subscribe( (res: any) => {
			this.translateBtn.disabled = false;
			console.log(res.data.translations[0].translatedText)
		},
		err => {
			console.log(err);
		});
	}


	navigationSubscription;
  
   loggedUser = [];
   public static loggedUser = [];
  

	reloadUser2(email){
		console.log("ngOnInit HOME");
		console.log("this.loggedUser", this.loggedUser[0] );
		console.log("HomeComponent.finalUser", HomeComponent.loggedUser[0]);

		//if(this.loggedUser[0] == undefined && HomeComponent.loggedUser[0] == undefined){
			console.log("YENDO A BUSCAR EL USUARIO", email);
			this.databaseConnection.finduser(email, this.loggedUser, HomeComponent.loggedUser);
			HomeComponent.loggedUser = this.loggedUser;

		//}
		//else if(HomeComponent.loggedUser[0] != undefined){
		//	this.loggedUser = HomeComponent.loggedUser;
		//}
	}

	reloadUser(){
		console.log("ngOnInit HOME");
		console.log("this.loggedUser", this.loggedUser[0] );
		console.log("HomeComponent.finalUser", HomeComponent.loggedUser[0]);

		var email = sessionStorage.getItem("email");

		if(this.loggedUser[0] == undefined && HomeComponent.loggedUser[0] == undefined){
			console.log("YENDO A BUSCAR EL USUARIO");
			this.databaseConnection.finduser(email, this.loggedUser, HomeComponent.loggedUser);
			HomeComponent.loggedUser = this.loggedUser;

		}
		else if(HomeComponent.loggedUser[0] != undefined){
			this.loggedUser = HomeComponent.loggedUser;
		}
	}

	translateBtn;
  ngOnInit(): void {

		this.reloadUser();
		this.translateBtn = document.getElementById("translatebtn");

		
		/*this.router.events.subscribe( i => {
			this.reloadUser();
		});*/
		//if(this.loggedUser != null)
		//	this.loggedUser = this.loggedUser;
			
		//this.loggedUser.push(this.returnClientFromSession());
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

  returnClientFromSession(){
	var userTwo = new Paciente();
	userTwo.nombre = localStorage.getItem('cliente');
	userTwo.documento = localStorage.getItem('documento');
	userTwo.foto = localStorage.getItem('foto');
	return userTwo;
  }

  //loggedUser = HomeComponent.loggedUser;
  turno;

  user = {
		email: "cliente1@utn.com",
		password: "123456"
  };

  usuario;

  Mensajes: string;

  showMe = "";
  
  referTo(value){
	var oldValue = this.showMe;
	this.showMe = value;
	//this.usuario = this.loggedUser;
	//misTurnos
	//listaTurnos
	//turno
	//misTurnos
	//perfil
	console.log(value);

	switch (value) {
		case "misTurnos":
			this.turno = null;
			var e = document.getElementById(value);
			//console.log(e);
			e.classList.add("w3-animate-top");
		break;

		case "listaTurnos":
			var e = document.getElementById(value);
			//console.log(e);
			e.classList.add("w3-animate-left");
		break;

		case "turno":
			var e = document.getElementById(value);
			//console.log(e);
			e.classList.add("w3-animate-right");
		break;

		case "perfil":
			var e = document.getElementById(value);
			//console.log(e);
			e.classList.add("w3-animate-bottom");
		break;
		case "alta":
			var e = document.getElementById(value);
			//console.log(e);
			e.classList.add("w3-animate-bottom");
		break;
		case "listaUsuarios":
			var e = document.getElementById(value);
			//console.log(e);
			e.classList.add("w3-animate-bottom");
		break;
		case "":
			var e = document.getElementById("home2");
			//console.log(e);
			var flagRight = false;
			var flagLeft = false;

			e.classList.forEach(element => {
				console.log("HOME CLASS", element);
				if(element == "w3-animate-right"){
					flagRight = true;
				}
				else if(element == "w3-animate-left"){
					flagLeft = true;
				}
			});

			if(flagRight){
				e.classList.replace("w3-animate-right", "w3-animate-left");
			}
			else if(flagLeft){
				e.classList.replace("w3-animate-left","w3-animate-right");
			}
			else{
				e.classList.add("w3-animate-right");
			}
			

		break;

	}


	/*e.addEventListener("animationend", listener, false);
	e.addEventListener("animationiteration", listener, false);
	e.className = "slidein";*/
  }

  LogOut(){
	sessionStorage.removeItem('email');
	this.router.navigate(['/login']);
	//localStorage.removeItem('documento');
	//localStorage.removeItem('foto');
  }

  redirectTo(path : String){
    this.router.navigate(["Home/"+path]);
  }

  Entrar(){
    console.log(this.loggedUser);
    console.log('entro', this.user);
    
    this.databaseConnection.login(this.user, this.loggedUser).then(res => {
	  console.log("Success", res);
	  
      //this.router.navigate(['/Home']);
      //localStorage.setItem('cliente', this.loggedUser[0].nombre);
    })
    .catch(err => {
      this.MostarMensaje(err.message);
      console.log("Failed", err.message);
    });
  }

  Entrar2() {
    console.log('entro', this.user);
    sessionStorage.setItem("email", this.user.email);
    console.log('email', this.user.email);
    this.databaseConnection.login(this.user, this.loggedUser).then(res => {
      	console.log("Success", res);
		  this.databaseConnection.finduser(this.user.email, this.loggedUser, HomeComponent.loggedUser);
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


	seleccionDeTurno(turno){
		this.showMe = 'turno';
		this.turno = turno;
	}

	seleccionDeUsuario(usuario){
		this.showMe = 'perfil';
		this.usuario = usuario;
	}

	turnoGuardado(){
		this.turno = null;
	}

	referToWithUser(showme, object){
		this.showMe = showme;
		this.usuario = object;

		if(showme == "perfil"){
			var e = document.getElementById(showme);
			e.classList.add("w3-animate-bottom");
		}
	}

}
