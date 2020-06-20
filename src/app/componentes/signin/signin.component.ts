import { DataBaseConnectionService } from './../../services/database-connection.service';
import { MisTurnosComponent } from './../turnos/mis-turnos/mis-turnos.component';
import { Component, OnInit } from '@angular/core';
import { CaptchaValidationService } from './../../services/captcha-validation.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	constructor(public databaseConnection : DataBaseConnectionService,
		private router: Router
		) { }

	ngOnInit(): void {
	}
	captchaResponse;

	user = {
		"email" : "",
		"password": "",
		"password2": "",
		"foto" : "",
		"foto2" : "",
		"rol" : "paciente"
	};

	Mensajes: string;

	resolved(captchaResponse: string, res) {
		console.log(`Resolved response token: ${captchaResponse}`);
		this.captchaResponse = captchaResponse;
	}

	async signIn(){
		var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if(this.user.password != this.user.password2){
			this.MostarMensaje("Las contraseñas no coinciden");
			return;
		}
		else if(this.user.foto == "" || this.user.foto2 == ""){
			this.MostarMensaje("Se necesitan subir las dos fotos");
			return;
		}
		else if(!this.user.email.match(EMAIL_REGEX) ){
			this.MostarMensaje("Formato de mail invalido");
			return;
		}

		var error;
		await this.databaseConnection.signIn(this.user).catch(i => {
			this.MostarMensaje(i);
			error = i;
			console.log("ERROR",i);
		});
	
		if(error == null || error == undefined){
			var x;
			
			var user2 = {
				"email" : this.user.email,
				"foto" : this.user.foto,
				"foto2": this.user.foto2,
				"rol" : this.user.rol
			};

			this.databaseConnection.saveEntity(DataBaseConnectionService.users, user2, x);
			sessionStorage.setItem("email", this.user.email);
			this.router.navigate(['/Home']);		
		}
	}

	saveUrl(event){

		if(this.user.foto == ""){
			this.user.foto = event;
		}
		else if(this.user.foto2 == ""){
			this.user.foto2 = event;
		}
		console.log(event);
		console.log(this.user);
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
}
