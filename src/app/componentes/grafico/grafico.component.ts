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

@Component({
	selector: 'app-grafico',
	templateUrl: './grafico.component.html',
	styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

	constructor(private databaseConnection: DataBaseConnectionService) { }
	@Input() usuario;
	@ViewChild('TABLE') table: ElementRef;
	displayedColumns = ['position', 'name', 'weight', 'symbol'];
	filterStartDate;
	filterEndDate;
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

	showGraphic(value) {
		this.columns.length = 0;
		this.rows.length = 0;

		console.info("SHOW - ", value);

		switch (value) {
			case "UsuariosLoggeados":
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

					this.generateChart("Operaciones Por Especialidad", array);
				});
				break;
				case "turnosPorDia":
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
					var array = [];

					var turnos = [];
					var turnosPorEspecialidad = {};
					var dias = [];

					this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.turno, turnos).then(result => {
						console.log("Todos los turnos", result);

						result.forEach(element => {
							console.log("Turno", element);
							
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

						this.generateChart("Turnos por dia", array);
					});
					
					//var turnosPorEspecialidad = new Map<String, String>();
	

					//Cantidad de turnos por día de la semana.

				break;

				case "medicosPorDias":
					//cantidad de dias que trabaja el medico
					var array = [];

					var usuarios = [];
					var medicoDias = {};
					var nombreDeMedico = [];

					this.databaseConnection.bringEntityWithEventEmmiter(DataBaseConnectionService.users, usuarios).then(result => {
						console.log("Todos los usuarios", result);

						result.forEach(element => {
							console.log("Usuario", element);
							
							var d = element;
							//element.asignado.documento
							console.log("Rol", d);
							
							if( element.rol != null &&  element.rol != undefined &&  element.rol == "Profesional"){
								d = d.apellido + ", " +d.nombre;

								console.log("Creo elemento", d);
								medicoDias[d] = element.dias.length;
								nombreDeMedico.push(d);
							}
	
						});
						
						nombreDeMedico.forEach(element => {
							this.columns.push(medicoDias[element]);
							this.rows.push(element);

							console.log("dias de trabajo", element + medicoDias[element]);
							array.push({ "y": medicoDias[element], "label": element });
						});

						this.generateChart("Turnos por dia", array);
					});
					
					//var turnosPorEspecialidad = new Map<String, String>();
	

					//Cantidad de turnos por día de la semana.

				break;

				//c- Médicos por cantidad de días.

				
		}

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
