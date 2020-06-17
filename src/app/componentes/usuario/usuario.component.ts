import { element } from 'protractor';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataBaseConnectionService } from '../../services/database-connection.service';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

	@Input() usuario;

	especialistas = ["Medicina General", "Odontologia", "Oftalmologia"];

	horarios = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
				"13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

	constructor(public databaseConnection: DataBaseConnectionService) { }

	ngOnInit(): void {
		//"weekday-1"
		if(this.usuario.dias != null){
			this.usuario.dias.forEach(element => {
				console.log(element);
				var el = document.getElementById('weekday-' + element);
				el.classList.add('weekday-selected');
			});
		}
	}

	/*
	weekday-selected
	weekday-selected
	weekday-selected
	weekday-selected
	weekday-selected
	weekday-selected
	weekday-selected*/

	guardar() {

		var array = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
		this.usuario.dias = new Array();

		array.forEach(element => {
			var el = document.getElementById('weekday-' + element);

			el.classList.forEach(classList => {
				console.log("classList", classList);

				if(classList == 'weekday-selected'){

					this.usuario.dias.push(element);

				}
			});
		});

		console.log(this.usuario.dias);

		this.databaseConnection.saveExistingEntity(DataBaseConnectionService.users, this.usuario, this.usuario.id);
	}

	select(event){
		console.log(event);
		if(event.target.classList != null){
			//event.target.classList
			var hasClass = false;
			event.target.classList.forEach(element => {
				if(element == 'weekday-selected'){
					hasClass = true;
				}
			});

			if(hasClass){
				event.target.classList.remove('weekday-selected');
			}
			else{
				event.target.classList.add('weekday-selected');
			}
		}

		console.log(event.target.classList);
		
	}

}
