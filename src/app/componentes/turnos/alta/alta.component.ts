import { element } from 'protractor';
import { HomeComponent } from './../../home/home.component';
import { DataBaseConnectionService } from './../../../services/database-connection.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import {MatDatepickerModule} from '@angular/material/datepicker';



@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})



export class AltaComponent implements OnInit {

  @Input() cliente;
  @Output() turnoGuardadoOutput = new EventEmitter();

  constructor(public databaseConnection : DataBaseConnectionService) {
    console.log("getTiming");

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
    "hora" : "",
    "cuestionario" : { "cuestionarioProfesional" : this.profesionalCuestionario, "cuestionarioCliente": this.clientelCuestionario },
    "asignado": {}
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
    this.turno.estado = 'Aceptado';
    this.turno.cliente = this.cliente;
    await this.databaseConnection.saveEntity(DataBaseConnectionService.turno, this.turno, x).then(i => {console.log(i)});
    this.guardandoTurno = false;
    this.turnoGuardado = true;

    this.turnoGuardadoOutput.emit();

    console.log("id", x);
  }

  users = [];

  weekday =[ 
 "Lun",
 "Mar",
 "Mie",
 "Jue",
 "Vie",
 "Sab",
 "Dom"
  ];

  getTiming(){
    console.log("getTiming");
    if(this.turno.especialista != null && this.turno.especialista !== undefined){
      console.log("SELECTEDDATE - ",this.turno.fecha);

      var date = this.turno.fecha + "T00:00:00";
      //let dateString = '1968-11-16T00:00:00' 
      let newDate = new Date(date);
      
      var day = this.weekday[newDate.getDay()];

      this.databaseConnection.bringDoctorTiming(DataBaseConnectionService.users, this.users, day, this.dayHours, this.turno.especialista);
      console.log("BROUGHT FROM DATABASE");
    }
  }

  emptyDating(){
    this.users = new Array();
    this.turno.hora = "";
    this.getTiming();
  }

  saveTime(doctorUser,hour){
    this.turno.hora = hour;
    this.turno.asignado = doctorUser;
  }

  dayHours =[ 
    "01:00",
    "02:00",
    "03:00",
    "04:00", 
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00", 
  ];


}
