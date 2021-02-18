import { element } from 'protractor';
/*app.component.ts*/
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
//const path = require('path');
import { DataBaseConnectionService } from './../../services/database-connection.service';
import { Subject } from 'rxjs';
import { totalmem } from 'os';

import * as XLSX from 'xlsx';
import { ClientRequest } from 'http';
import { IfStmt } from '@angular/compiler';


@Component({
	selector: 'app-grafico',
	templateUrl: './grafico.component.html',
	styleUrls: ['./grafico.component.css'],
})
export class GraficoComponent implements OnInit {

	constructor(private databaseConnection: DataBaseConnectionService) { }
	@Input() usuario;
	@ViewChild('TABLE') table: ElementRef;
	displayedColumns = ['position', 'name', 'weight', 'symbol'];
	filterStartDate;
	filterEndDate;
	encuestaSelected;

	Cuestionario = [
			"Recomendarias al paciente?",
			"Tuvo buen manejo con la app?",
			"Rango de Felicidad",
			"Numero de Paracetamol",
			"Recomendarias al doctor?",
			"Recomendarias la clinica?",
			"Paracetamol de Numero",
			"Satisfaccion del Profesional",
			"Satisfaccion del Cliente"
		];
	/*
    
	1- De los profesionales:
	  a- Los días y horarios que se Ingresaron al sistema.
	  lastConnection
	  b- Cantidad de operaciones de todos por especialidad
	  getTurnos
    
	2- De los días de la semana:
	  a- Cantidad de turnos por día de la semana.

	  b- Médicos por cantidad de turnos.

	  c- Médicos por cantidad de días.
    
	*/
	columns = [];
	rows = [];
	encuesta = false;

	showGraphic(value) {
		this.columns.length = 0;
		this.rows.length = 0;

		console.info("SHOW - ", value);

		switch (value) {
			case "UsuariosLoggeados":
				this.encuesta = false;
				var allUsers = [];

				console.log(this.filterStartDate);
				console.log(this.filterEndDate);

				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.users, allUsers).then(result => {
					console.log("Todos los usuarios", result);
					var array = [];

					var lastConnectedDate;
					//var total = (100 / result.length);
					result.forEach(user => {
						if (user.lastConnections == undefined || user.lastConnections == null) {
							return;
						}
						//var total = element.lastConnections.length;
						var total = 0;

						user.lastConnections.forEach(element => {
							console.log("last connection: ", element);

							var d = new Date(element);					
							console.log("last connection to date: ", d);



							if(this.isDateBetween(d,
								this.filterStartDate != null ? new Date(this.filterStartDate) : null,
								this.filterEndDate != null ? new Date(this.filterEndDate) : null)
								){
								console.log("isDateBetween ");

								total ++;

								//this.columns.push(total);
								this.columns.push(d);
								this.rows.push(user.apellido + ", " + user.nombre);
								lastConnectedDate = d.toDateString();
							}

						});

						if(lastConnectedDate)
							array.push({ "y": total, "label": lastConnectedDate + " - " + user.apellido + ", " + user.nombre });
					});

					this.generateChart("Usuarios Loggeados", array);
				});

				break;

			case "turnosPorEspecialidad":
				this.encuesta = false;
				var array = [];

				var turnos = [];
				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.turno, turnos).then(result => {
					console.log("Todos los turnos", result);

					//var turnosPorEspecialidad = new Map<String, String>();
					var turnosPorEspecialidad = {};
					var especialidades = [];

					result.forEach(element => {
						console.log("Turno", element);

						if(turnosPorEspecialidad[element.especialista] != null || turnosPorEspecialidad[element.especialista] != undefined){
							console.log("Agrego Especialidad", element.especialista);
							turnosPorEspecialidad[element.especialista] = turnosPorEspecialidad[element.especialista] + 1;
						}
						else{
							console.log("Creo Especialidad", element.especialista);
							turnosPorEspecialidad[element.especialista]	= 1;
							especialidades.push(element.especialista);
						}

					});
					
					especialidades.forEach(element => {
						this.columns.push(turnosPorEspecialidad[element]);
						this.rows.push(element);

						console.log("turnosPorEspecialidad", element);
						array.push({ "y": turnosPorEspecialidad[element], "label": element });
					});

					this.generateChart("Turnos Y especialidades", array);
				});
				break;
			
			case "turnosPorDia":
				this.encuesta = false;
				var array = [];

				var turnos = [];
				var turnosPorEspecialidad = {};
				var dias = [];

				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.turno, turnos).then(result => {
					console.log("Todos los turnos", result);

					result.forEach(element => {
						console.log("Turno", element);
						var d = new Date(element.fecha).getDay().toLocaleString();
						d = this.parseNumberIntoDay(d);
						console.log("Dia del turno", d);
						
						if(d != null && d != undefined){

							if(turnosPorEspecialidad[d] != null || turnosPorEspecialidad[d] != undefined){
								console.log("Agrego turno al dia", d);
								turnosPorEspecialidad[d] = turnosPorEspecialidad[d] + 1;
							}
							else{
								console.log("Creo el dia", d);
								turnosPorEspecialidad[d] = 1;
								dias.push(d);
							}
						}

					});
					
					dias.forEach(element => {
						this.columns.push(turnosPorEspecialidad[element]);
						this.rows.push(element);

						console.log("turnosPorEspecialidad", element + turnosPorEspecialidad[element]);
						array.push({ "y": turnosPorEspecialidad[element], "label": element });
					});

					this.generateChart("Turnos por dia", array);
				});
				
				//var turnosPorEspecialidad = new Map<String, String>();


				//Cantidad de turnos por día de la semana.

			break;

			//b- Médicos por cantidad de turnos.

			case "turnosPorMedicos":
				this.encuesta = false;
				var array = [];

				var turnos = [];
				var turnosPorEspecialidad = {};
				var dias = [];

				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.turno, turnos).then(result => {
					console.log("Todos los turnos", result);

					result.forEach(element => {
						console.log("Turno", element);
						

						if(element.fecha != null && element.fecha != undefined){
							var turnoFecha = new Date(element.fecha);

							if(!this.isDateBetween(turnoFecha,
								this.filterStartDate != null ? new Date(this.filterStartDate) : null,
								this.filterEndDate != null ? new Date(this.filterEndDate) : null)
								){
								return;
							}
						}

						var d = element.asignado;
						//element.asignado.documento
						console.log("documento del medico", d);
						
						if(d != null && d != undefined){
							d = d.apellido + ", " +d.nombre;
							if(turnosPorEspecialidad[d] != null || turnosPorEspecialidad[d] != undefined){
								console.log("Agrego turno al dia", d);
								turnosPorEspecialidad[d] = turnosPorEspecialidad[d] + 1;
							}
							else{
								console.log("Creo el dia", d);
								turnosPorEspecialidad[d] = 1;
								dias.push(d);
							}
						}

					});
					
					dias.forEach(element => {
						this.columns.push(turnosPorEspecialidad[element]);
						this.rows.push(element);

						console.log("turnosPorEspecialidad", element + turnosPorEspecialidad[element]);
						array.push({ "y": turnosPorEspecialidad[element], "label": element });
					});

					this.generateChart("Turnos Medicos", array);
				});
				
				//var turnosPorEspecialidad = new Map<String, String>();


				//Cantidad de turnos por día de la semana.

			break;

			case "medicosPorDias":
				this.encuesta = false;
				//cantidad de dias que trabaja el medico
				var array = [];

				var usuarios = [];
				var medicoDias = {};
				var nombreDeMedico = [];

				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.users, usuarios).then(result => {
					console.log("Todos los usuarios", result);


					var daysPerWeek;
					if(this.filterStartDate != null && this.filterEndDate != null){
						daysPerWeek = this.getDatesDays(this.filterStartDate, this.filterEndDate);
					}

					result.forEach(element => {
						console.log("Usuario", element);
						
						var d = element;
						//element.asignado.documento
						console.log("Rol", d);
						
						if( element.rol != null &&  element.rol != undefined &&  element.rol == "Profesional"){
							d = d.apellido + ", " +d.nombre;
							console.log("Creo elemento", d);

							if(this.filterStartDate != null && this.filterEndDate != null){
								var daysWorked = 0;
								element.dias.forEach(element => {
									console.log("daysPerWeek element - ", this.parseDayIntoNumber(element) );
									console.log("daysPerWeek - ", daysPerWeek[this.parseDayIntoNumber(element)] );


									daysWorked += daysPerWeek[this.parseDayIntoNumber(element)];
								});

								console.log("DIAS TRABAJADOS - " + d, daysWorked);
								medicoDias[d] = daysWorked;
							}else{
								console.log("DIAS TRABAJADOS - " + d, element.dias.length);
								medicoDias[d] = element.dias.length;

							}

							if(medicoDias[d] != null && medicoDias[d] > 0)
								nombreDeMedico.push(d);
						}

					});
					
					nombreDeMedico.forEach(element => {
						this.columns.push(medicoDias[element]);
						this.rows.push(element);

						console.log("dias de trabajo", element + medicoDias[element]);
						array.push({ "y": medicoDias[element], "label": element });
					});

					this.generateChart("Dias de trabajo", array);
				});
				
				//var turnosPorEspecialidad = new Map<String, String>();


				//Cantidad de turnos por día de la semana.

			break;

			//c- Médicos por cantidad de días.
			case "cantidadVisitas":
				this.encuesta = false;
				var allUsers = [];

				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.users, allUsers).then(result => {
					console.log("Todos los usuarios", result);
					var array = [];

					//var total = (100 / result.length);
					result.forEach(user => {
								var total = user.lastConnections != null ? user.lastConnections.length : 0;
								if(total > 0){
									this.columns.push(total);
									this.rows.push(user.apellido + ", " + user.nombre);
									array.push({ "y": total, "label": user.apellido + ", " + user.nombre });

								}
							});

					this.generateChart("Cantidad de visitas", array);

				});


			break;

			case "pacientePorEspecialidad":
				this.encuesta = false;
				
				var turnos = [];
				var array = [];
				var clientes = [];
				var clientesKey = [];
				var especialidad = new Array();
				var listaEspecailidades = [];

				let nameAgeMapping = new Map();

				
				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.turno, turnos).then(result => {
					console.log("Todos los Turnos", result);

					//var total = (100 / result.length);
					result.forEach(turno => {
						console.log("turno", turno);

						clientes[turno.cliente.apellido + ", " + turno.cliente.nombre + " - " + turno.especialista] = turno;
						clientes.length ++;
						clientesKey.push(turno.cliente.apellido + ", " + turno.cliente.nombre + " - " + turno.especialista);

						console.log("clientes", clientes);
						console.log("clientesKey", clientesKey);
					});

					console.log("before clientes" + clientes.length, clientes);
					
					clientesKey.forEach(key => {
						console.log("KEY", key);
						var turno = clientes[key];
						console.log("TURNO", turno);
						
						if(especialidad[turno.especialista] == null || especialidad[turno.especialista] == undefined)
							especialidad[turno.especialista] = 0;

						especialidad[turno.especialista] = especialidad[turno.especialista] + 1;

						if(nameAgeMapping.get(turno.especialista) == null || nameAgeMapping.get(turno.especialista) == undefined){
							nameAgeMapping.set(turno.especialista, 0);
						}

						nameAgeMapping.set(turno.especialista, nameAgeMapping.get(turno.especialista) + 1);
						//especialidad.length++;
						

						listaEspecailidades.push(turno.especialista);

					});
					console.log("listaEspecailidades", listaEspecailidades);
					console.log("especialidad", especialidad);

					var next = especialidad.values().next();
					console.log("especialidadIterator", nameAgeMapping);
					
					nameAgeMapping.forEach((value: string, key: string) => {
						this.columns.push(value);
						this.rows.push(key);
						array.push({ "y": value, "label": + value + " - "+ key });

						console.log(key, value);
					});
					
					this.generateChart("Paciente por Especialidad", array);
				});
			break;

			case "medicosPorEspecialidad":
				this.encuesta = false;
				//cantidad de dias que trabaja el medico
				var array = [];

				var usuarios = [];

				let especialidadMedico = new Map();


				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.users, usuarios).then(result => {
					console.log("Todos los usuarios", result);

					result.forEach(element => {
						console.log("Usuario", element);
						
						var d = element;
						//element.asignado.documento
						console.log("Rol", d);
						
						if( element.rol != null &&  element.rol != undefined &&  element.rol == "Profesional"){

							if(especialidadMedico.get(element.especialista) == null || especialidadMedico.get(element.especialista) == undefined){
								especialidadMedico.set(element.especialista, 0);
							}
	
							especialidadMedico.set(element.especialista, especialidadMedico.get(element.especialista) + 1);
						}
							
					});
					
					especialidadMedico.forEach((value: string, key: string) => {
						this.columns.push(value);
						this.rows.push(key);
						array.push({ "y": value, "label": + value + " - "+ key });
					});

					this.generateChart("Medicos por especialidad", array);
				});
				
				//var turnosPorEspecialidad = new Map<String, String>();


				//Cantidad de turnos por día de la semana.

			break;

			case "resultadoEncuesta":
				this.encuesta = true;
				//cantidad de dias que trabaja el medico
				var arrayCliente = [];
				var arrayProfesional = [];

				var usuarios = [];

				let sad = new Map();

				var turnos = [];
				var turnosPorEspecialidad = {};
				var dias = [];

				let respuestas = new Map();

/*	profesionalCuestionario = [
		{
			"pregunta": "Recomendarias al paciente?",
			"respuesta": ""
		},
		{
			"pregunta": "Tuvo buen manejo con la app?",
			"respuesta": ""
		},
		{
			"pregunta": "Rango de Felicidad",
			"respuesta": ""
		},
		{
			"pregunta": "Numero de Paracetamol",
			"respuesta": ""
		}
	];
  
  
  clientelCuestionario =  [
		{
			"pregunta": "Recomendarias al doctor?",
			"respuesta": ""
		},
		{
			"pregunta": "Recomendarias la clinica?",
			"respuesta": ""
		},
		{
			"pregunta": "Rango de Felicidad",
			"respuesta": ""
		},
		{
			"pregunta": "Paracetamol de Numero",
			"respuesta": ""
		}
	];
*/ 
				//let respuestasCliente1 = new Map();
				let respuestasCliente2 = new Map();
				let respuestasCliente3 = new Map();
				let respuestasCliente4 = new Map();
				let respuestasCliente5 = new Map();


				let respuestasProfesional1 = new Map();
				let respuestasProfesional2 = new Map();
				let respuestasProfesional3 = new Map();
				let respuestasProfesional4 = new Map();
				let respuestasProfesional5 = new Map();


				let respuestasTotales = new Map();


				this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.turno, turnos).then(result => {
					//cuestionario
					//cuestionarioCliente
					//pregunta
					//respuesta

					//cuestionarioProfesional
					//pregunta
					//respuesta

					//ratingDelPacienteAlProfesional

					//ratingDelProfesionalAlPaciente
					
					//pregunta
					//respuesa
					//cantidad de gente con la misma respuesta

					//votos con misma eleccion / todos los votos
					
					//  / element.length;

					//1 recorrer todos los turnos
					//Cuanta gente puso la misma respuesta??
					//respuesta 1 "Si" ++



					for(let i = 0; i < 4; i++){
						var largo = 0;
						var preg;
						var array = [];
						var arrayCliente = [];
						var total= 0;
						let respuestasCliente1 = new Map();


						result.forEach(element => {
							
							if(element.cuestionario != null && element.cuestionario != undefined){

								if(element.cuestionario.cuestionarioCliente[i] != null && element.cuestionario.cuestionarioCliente[i] != undefined){

									preg = element.cuestionario.cuestionarioCliente[i].pregunta;

									if(preg == this.encuestaSelected){
										console.log("SUCCESS");
										console.log(preg, this.encuestaSelected);

										total = total +1;

										var respuestaEncuesta = element.cuestionario.cuestionarioCliente[i].respuesta;
										var respuesta = respuestasCliente1.get(element.cuestionario.cuestionarioCliente[i].respuesta);

										if(respuesta == null || respuesta == undefined){
											if(respuestaEncuesta == null || respuestaEncuesta == undefined || respuestaEncuesta == ""){
												var respuestaNula = respuestasCliente1.get("No respondio");
												if(respuestaNula == null ||respuestaNula == undefined)
													respuestasCliente1.set("No respondio", 0);
											}else
											respuestasCliente1.set(element.cuestionario.cuestionarioCliente[i].respuesta, 0);
										}

										if(respuestaEncuesta == null || respuestaEncuesta == undefined || respuestaEncuesta == ""){
											respuestasCliente1.set("No respondio", respuestasCliente1.get("No respondio") +1 );
										}
										else
											respuestasCliente1.set(element.cuestionario.cuestionarioCliente[i].respuesta, respuestasCliente1.get(element.cuestionario.cuestionarioCliente[i].respuesta) +1 );
									}
								}

								if(element.cuestionario.cuestionarioProfesional[i] != null && element.cuestionario.cuestionarioProfesional[i] != undefined){

									preg = element.cuestionario.cuestionarioProfesional[i].pregunta;

									if(preg == this.encuestaSelected){
										
										console.log("SUCCESS");
										console.log(preg, this.encuestaSelected);

										total = total +1;

										var respuestaEncuesta = element.cuestionario.cuestionarioProfesional[i].respuesta;
										var respuesta = respuestasCliente1.get(element.cuestionario.cuestionarioProfesional[i].respuesta);

										if(respuesta == null || respuesta == undefined){
											if(respuestaEncuesta == null || respuestaEncuesta == undefined || respuestaEncuesta == ""){
												var respuestaNula = respuestasCliente1.get("No respondio");
												if(respuestaNula == null ||respuestaNula == undefined)
													respuestasCliente1.set("No respondio", 0);
											}else
											respuestasCliente1.set(element.cuestionario.cuestionarioProfesional[i].respuesta, 0);
										}

										if(respuestaEncuesta == null || respuestaEncuesta == undefined || respuestaEncuesta == ""){
											respuestasCliente1.set("No respondio", respuestasCliente1.get("No respondio") +1 );
										}
										else
											respuestasCliente1.set(element.cuestionario.cuestionarioProfesional[i].respuesta, respuestasCliente1.get(element.cuestionario.cuestionarioProfesional[i].respuesta) +1 );
									}
								}

								if(this.encuestaSelected == "Satisfaccion del Profesional"){
									console.log("Satisfaccion del Profesional",  preg);

									var rating = element.ratingDelProfesionalAlPaciente;
									if(rating != null && rating != undefined){
										if(respuestasCliente1.get(rating) == null || respuestasCliente1.get(rating) == undefined)
											respuestasCliente1.set(rating, 1);
										else
											respuestasCliente1.set(rating, respuestasCliente1.get(rating) + 1 );

										total = total +1;
									}
									
								}
								else if(this.encuestaSelected == "Satisfaccion del Cliente"){
									console.log("Satisfaccion del Cliente",  preg);

									var rating = element.ratingDelPacienteAlProfesional;
									if(rating != null && rating != undefined){
										if(respuestasCliente1.get(rating) == null || respuestasCliente1.get(rating) == undefined)
											respuestasCliente1.set(rating, 1);
										else
											respuestasCliente1.set(rating, respuestasCliente1.get(rating) + 1 );

										total = total +1;
									}
								}
							}
						});

						respuestasCliente1.forEach((value: any , key: string) => {

							console.log("VALUE",  value);
							console.log("TOTAL",  total);
							console.log("RESPUESTA",  key);
							var splitted = value/total;
							console.log("splitted",  splitted);
							console.log("splitted * 100",  splitted*100);
							console.log("splitted * 100 to fixed",  (splitted*100).toFixed(3));

								arrayCliente.push({
									"y": ((value/total) * 100).toFixed(2),
									"label": key + " "+((value/total) * 100).toFixed(2) + "%"
								});
						});

						if(arrayCliente.length > 0){
							console.log("array",  arrayCliente);
							this.generatePieChart(this.encuestaSelected, arrayCliente);
						}
					}




						/*			element.cuestionario.cuestionarioCliente.forEach(cuestionarioObj => {

										var preguntaGuardada = respuestasTotales.get(cuestionarioObj.pregunta);

										if(preguntaGuardada == null 
										|| preguntaGuardada == undefined){
											respuestasTotales.set(element.cuestionario.cuestionarioCliente[0].pregunta, {"Si": 0, "No": 0});
										}

										preguntaGuardada = respuestasTotales.get(element.cuestionario.cuestionarioCliente[0].pregunta);

										if(element.cuestionario.cuestionarioCliente[0].respuesta == "Si"){
											preguntaGuardada.Si ++;
											respuestasTotales.set(element.cuestionario.cuestionarioCliente[0].pregunta, preguntaGuardada);
										}
										else if(element.cuestionario.cuestionarioCliente[0].respuesta == "No"){
											preguntaGuardada.No ++;
											respuestasTotales.set(element.cuestionario.cuestionarioCliente[0].pregunta, preguntaGuardada);
										}
								});


								respuestasTotales.forEach((value: any , key: string) => {
									arrayCliente.push({
										"y": value.Si / element.length,
										"label": + " - " + key
									});
								});

								
							}

								/*
								element.cuestionario.cuestionarioCliente.forEach(cuestionarioClient => {

									respuestas.set(cuestionarioClient.respuesta, )
									console.log("cuestionarioClient", cuestionarioClient)
									arrayCliente.push({
									"y": cuestionarioClient.pregunta,
									"label": + " - " + cuestionarioClient.respuesta
									});
								});

								arrayCliente.push({
									"y": "Rating del paciente",
									"label": + " - " + element.ratingDelPacienteAlProfesional
								});
							}
						});


					}*/
					//this.columns.push(value);
					//this.rows.push(key);
					//array.push({ "y": value, "label": + value + " - "+ key });


				});
				
				//var turnosPorEspecialidad = new Map<String, String>();


				//Cantidad de turnos por día de la semana.

			break;
			
		}

	}


	getDatesDays(dateStart, dateEnd) {

		

		var dates = [];

		var currentDate = new Date(dateStart);
		var dateFinish = new Date(dateEnd);

		console.log("BEFORE WHILE:");
		while(currentDate.getTime() <= dateFinish.getTime()) {
		console.log("ON WHILE:");

		  dates.push(currentDate.toDateString());
		  console.log("DATE TO PUSH1", currentDate);

		  console.log("DATE PUSHED", dates[0]);
		  console.log("DATE PUSHED", dates[1]);
		  console.log("DATE PUSHED", dates[2]);


		  var d = new Date(currentDate);
		  d.setDate(d.getDate() + 1);
		  currentDate = d;
		  console.log("DATE TO PUSH2", currentDate);

		}

		console.log("DATES:", dates);

		return this.filterWeekDays(dates, [0,1,2,3,4,5,6]);
	  }

	  filterWeekDays(dates, includeDays) {
		var weekdaysAmount = [];
	  
		// cycle dates
		dates.forEach(date => {
			console.log("daydates:", date);

			var d = new Date(date);
		  // cycle days to be included (so==0, mo==1, etc.)
		  includeDays.forEach(include => {

			console.log("getDay:", d.getDay());
			console.log("include:", include);

			if(d.getDay() == include) {
				
				if(weekdaysAmount[d.getDay()] == null || weekdaysAmount[d.getDay()] == undefined){
					weekdaysAmount[d.getDay()] = 0;
				}

				weekdaysAmount[d.getDay()] ++;
			}
		  });
		});

		return weekdaysAmount;
	  }

	isDateBetween(date1, minDate, maxDate){

		console.log("date1", date1);
		console.log("minDate", minDate);
		console.log("maxDate", maxDate);

		var minDateTime;
		var maxDateTime;

		if(minDate == null || minDate == undefined){
			minDateTime = 0;
		}
		else
			minDateTime = minDate.getTime();

		if(maxDate == null || maxDate == undefined){
			maxDateTime = 999999999999999999999999999999;
		}
		else
			maxDateTime = maxDate.getTime();
		
		if(date1.getTime() >= minDateTime && date1.getTime() <= maxDateTime){
			return true;
		}

		return false;
	}

	parseDayIntoNumber(dia){
		switch(dia){
			case "Dom":
				return "0";
			case "Lun":
				return "1";
			case "Mar":
				return "2";
			case "Mie":
				return "3";
			case "Jue":
				return "4";
			case "Vie":
				return "5";
			case "Sab":
				return "6";

		}
	}

	parseNumberIntoDay(dia){
		switch(dia){
			case "1":
				return "Lun";
			case "2":
				return "Mar";
			case "3":
				return "Mie";
			case "4":
				return "Jue";
			case "5":
				return "Vie";
			case "6":
				return "Sab";
			case "7":
				return "Dom";
		}
	}

	/*type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name} - #percent%",
			
	*/

	generateChart(nombre, array) {
		let chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: nombre
			},
			data: [{
				type: "column",
				dataPoints: array
			}]
		});

		chart.render();
	}

	generatePieChart(nombre, array) {
		let chart = new CanvasJS.Chart("chartContainer", {
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: nombre
			},
			data: [{
				type: "pie",
				dataPoints: array

			}]
		});

		chart.render();
	}

	ngOnInit() {
		let chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Datos en formato de Columna"
			},
			data: [{
				type: "column",
				dataPoints: [
					/*{ y: 71, label: "Apple" },
					{ y: 55, label: "Mango" },
					{ y: 50, label: "Orange" },
					{ y: 65, label: "Banana" },
					{ y: 95, label: "Pineapple" },
					{ y: 68, label: "Pears" },
					{ y: 28, label: "Grapes" },
					{ y: 34, label: "Lychee" },
					{ y: 14, label: "Jackfruit" }*/
				]
			}]
		});

		chart.render();
	}

	clubs = [
		{
		  position: 1,
		  name: "Liverpool",
		  played: 20,
		  won: 19,
		  drawn: 1,
		  lost: 0,
		  points: 58
		},
		{
		  position: 2,
		  name: "Leicester City",
		  played: 21,
		  won: 14,
		  drawn: 3,
		  lost: 4,
		  points: 45
		},
		{
		  position: 3,
		  name: "Manchester City",
		  played: 21,
		  won: 14,
		  drawn: 2,
		  lost: 5,
		  points: 44
		},
		{
		  position: 4,
		  name: "Chelsea",
		  played: 21,
		  won: 11,
		  drawn: 3,
		  lost: 7,
		  points: 36
		},
		{
		  position: 5,
		  name: "Manchester United",
		  played: 21,
		  won: 8,
		  drawn: 7,
		  lost: 6,
		  points: 31
		}
	   ];

	   exportToExcel() {
		const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		
		/* save to file */
		XLSX.writeFile(wb, 'SheetJS.xlsx');
	   }
}
