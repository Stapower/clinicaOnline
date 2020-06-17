import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataBaseConnectionService } from './../../../services/database-connection.service';
import { getMaxListeners } from 'cluster';
import { generateKeyPair } from 'crypto';

@Component({
	selector: 'app-turno',
	templateUrl: './turno.component.html',
	styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
	@Input() turno;
	@Input() usuario;
	@Output() turnoGurdado = new EventEmitter();

	constructor(public databaseConnection: DataBaseConnectionService) {

	}
	ngOnInit(): void {
		console.log(this.usuario);
		console.log("before going to send email");
	}
	estados = [
		"Finalizado"
		, "Aceptado"
		, "Rechazado"
		, "Pendiente"
	];

	extras = [];

	comentarioNuevo;
	resena = false;
	async guardar() {

		if (this.turno.comentarios == null)
			this.turno.comentarios = [];

		if (this.comentarioNuevo != null) {
			var comentario = { "usuario": this.usuario, "comentario": this.comentarioNuevo };
			this.turno.comentarios.push(comentario);
		}

		if (this.usuario.rol == 'doctor') {
			this.turno.asignado = this.usuario;
		}

		/*if(this.extras != null && this.extras.length > 0){
			if(this.turno.extras != null){
				this.turno.extras.push(this.extras);
			}
			else{
				this.turno.extras = this.extras;
			}
		}*/

		await this.databaseConnection.saveExistingEntity(DataBaseConnectionService.turno, this.turno, this.turno.id);
		this.sendEmailtwo();

		this.turnoGurdado.emit(this.turno);
	}


	async cancelar(){
		this.turno.estado = 'Cancelado';
		await this.databaseConnection.saveExistingEntity(DataBaseConnectionService.turno, this.turno, this.turno.id);
		this.sendEmailtwo();

		this.turnoGurdado.emit(this.turno);
	}


	//
	/*
	$.ajax({
	type: “POST”,
	url: “https://mandrillapp.com/api/1.0/messages/send.json”,
	data: {
	  "key": "YOUR API KEY HERE",
	  "message": {
		"from_email": "YOUR@EMAIL.HERE",
		"to": [
			{
			  "email": "RECIPIENT_NO_1@EMAIL.HERE",
			  "name": "RECIPIENT NAME (OPTIONAL)",
			  "type": "to"
			},
			{
			  "email": "RECIPIENT_NO_2@EMAIL.HERE",
			  "name": "ANOTHER RECIPIENT NAME (OPTIONAL)",
			  "type": "to"
			}
		  ],
		"autotext": "true",
		"subject": "YOUR SUBJECT HERE!",
		"html": "YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!"
	  }
	}
   }).done(function(response) {
	 console.log(response); // if you're into that sorta thing
   });
   */

  	//https://mandrillapp.com/api/1.0/messages/send.json?key=0462c142c5b70d95c307b28794e2d7f4-us10
	sendEmailtwo() {
		//bring user using this.turno.documento
		console.log("going to send email");

		console.log("inside httpcall");
		
		var key = "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";

		var xhr = new XMLHttpRequest();
		xhr.open("post", "/v3/mail/send", true);
		xhr.setRequestHeader("Authorization", "Bearer " + key);
		var data = {
				"personalizations": [
					{
						"to": [
							{
								"email": this.turno.cliente.email
							}
						]
					}
				],
				"from": {
					"email": "tomy_nfs2@hotmail.com"
				},
				"subject": "Clinica Online - Cambio en turno medico",
				"content": [
					{
						"type": "text/html",
						"value": this.turnohttp()
					}
				]
		};


		if (data != null) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(data));
		}
		else xhr.send();

		console.log("email sent");
	}


	turnohttp(){
		var x =  "<div class='card mb-4 shadow-sm' style='background-color: #454d55; color:white'>"

		+	"<ul class='list-unstyled mt-3 mb-4'>"
		+	"	<li> Nombre: "  + this.turno.nombre  + "</li>"
		+	"</ul>"

		+	"<ul class='list-unstyled mt-3 mb-4'>"
		+	"	<li> Documento: "  + this.turno.documento  + "</li>"
		+	"</ul>"
	
		+	"<ul class='list-unstyled mt-3 mb-4'>"
		+	"	<li> Descripcion : "  + this.turno.descripcion  + "</li>"
		+	"</ul>"
	
		+	"<ul class='list-unstyled mt-3 mb-4'>"
		+	"	<li> Especialista : "  + this.turno.especialista  + "</li>"
		+	"</ul>"
	
		+	"<ul class='list-unstyled mt-3 mb-4'>"
		+	"	<li> Estado: " + this.turno.estado  + "</li>"
		+	"</ul>";
	
		if(this.turno.comentarios != null){
			this.turno.comentarios.forEach(element => {
				x +="	<ul class='list-unstyled mt-3 mb-4'>"
				+	"		<li> " + element.usuario.nombre + ":" + element.comentario + "</li>"
				+	"	</ul>";
			});
		}

		if(this.turno.extras != null && this.turno.extras.length > 0 ){
			this.turno.extras.forEach(element => {
				x +="	<ul class='list-unstyled mt-3 mb-4'>"
				+	"		<li> " + element.key + ":" + element.value + "</li>"
				+	"	</ul>";
			});
		}

		return x;
	}

	sendEmail3(){
		//
		/*
		curl --request POST \
		--url https://api.sendgrid.com/v3/mail/send \
		--header "Authorization: Bearer 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" \
		--header 'Content-Type: application/json' \
		--data '{"personalizations": [{"to": [{"email": "test@example.com"}]}],"from": {"email": "test@example.com"},"subject": "Sending with SendGrid is Fun","content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]}'
		*/
	}



	/*sendEmail2(){
		$.ajax({
			type: 'POST',
			url: 'https://mandrillapp.com/api/1.0/messages/send.json',
			data: {
			  'key': '0462c142c5b70d95c307b28794e2d7f4-us10',
			  'message': {
				'from_email': 'tomy_nfs2@hotmail.com',
				'to': [
					{
					  'email': 'tomynfs2@gmail.com',
					  'type': 'to'
					}
				  ],
				'autotext': 'true',
				'subject': 'YOUR SUBJECT HERE!',
				'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
			  }
			}
		   }).done(function(response) {
			 console.log(response); // if you're into that sorta thing
		   });
	}
*/
rating(raiting){
	this.turno.rating = raiting;
}

dejarResena(){
	this.resena = true;
}

addExtra(){
	
	if(this.turno.extras != null && this.turno.extras.length > 0)
			this.turno.extras.push({"key":"", "value":""});	
	else{
			this.turno.extras = [{"key":"", "value":""}];
	}
}

}
