import { HomeComponent } from './../../home/home.component';
import { DataBaseConnectionService } from './../../../services/database-connection.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

  @Input() cliente;
  @Output() turnoGuardadoOutput = new EventEmitter();

  constructor(public databaseConnection : DataBaseConnectionService) {

   }

   ngOnInit(): void {

    console.log("ngoninit ALTA");
    console.log("LoginComponent.finalUser", LoginComponent.finalUser);
    //console.log(" HomeComponent.loggedUser",  HomeComponent.loggedUser);

		this.turno.nombre = this.cliente.nombre;
		this.turno.documento = this.cliente.documento;
	
	/*else if(HomeComponent.loggedUser[0] != null && HomeComponent.loggedUser[0].nombre) {
		this.turno.nombre = HomeComponent.loggedUser[0].nombre;
		this.turno.documento = HomeComponent.loggedUser[0].documento;
	}*/

	console.log(this.turno.nombre);


    this.getEspecialidades();

  }

	especialistas = [];

	profesionalCuestionario = [
		{
			"pregunta": "Recomendarias al paciente?",
			"respuesta": ""
		},
		{
			"pregunta": "Tuvo buen manejo con la app?",
			"respuesta": ""
		},
  ];
  
  clientelCuestionario = [
		{
			"pregunta": "Recomendarias al doctor?",
			"respuesta": ""
		},
		{
			"pregunta": "Recomendarias la clinica?",
			"respuesta": ""
		},
  ];


  


  turno = {
    "nombre" : "",
    "id" : "" ,
    "documento" : "",
    "especialista" : "",
    "descripcion" : "",
    "fecha" : "",
    "estado" : "",
    "cliente" : {},
    "cuestionario" : { "cuestionarioProfesional" : this.profesionalCuestionario, "cuestionarioCliente": this.clientelCuestionario }
  };

  //especialistas = ["Medicina General", "Odontologia", "Oftalmologia",];

  guardandoTurno = false;
  turnoGuardado = false;

	getEspecialidades(){
		this.databaseConnection.bringEntity(DataBaseConnectionService.especialidades, this.especialistas);
	}

  async crear(){
	var x;
  this.guardandoTurno = true;
  this.turno.estado = 'Pendiente';
  this.turno.cliente = this.cliente;
	await this.databaseConnection.saveEntity(DataBaseConnectionService.turno, this.turno, x).then(i => {console.log(i)});
	this.guardandoTurno = false;
  this.turnoGuardado = true;

  this.turnoGuardadoOutput.emit();

	console.log("id", x);
  }

}
