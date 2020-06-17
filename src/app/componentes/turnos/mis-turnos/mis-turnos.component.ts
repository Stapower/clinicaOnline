import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataBaseConnectionService } from './../../../services/database-connection.service';

@Component({
	selector: 'app-mis-turnos',
	templateUrl: './mis-turnos.component.html',
	styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

	constructor(public databaseConnection: DataBaseConnectionService) {
	}

	@Output() turnoSeleccionado = new EventEmitter();
	@Input() usuario;


	turnos = [];

	ngOnInit(): void {
		var filter = this.usuario.documento;
		console.log("documento: ", filter);

		if (this.usuario.rol != null && this.usuario.rol == 'doctor'){
			this.databaseConnection.bringEntityWithAssignment(DataBaseConnectionService.turno, this.turnos, filter);
		}
		else{
			this.databaseConnection.bringEntityWithFilterDocument(DataBaseConnectionService.turno, this.turnos, filter);
		}
	}


	seleccionar(turno) {
		this.turnoSeleccionado.emit(turno);
	}


	orderBy(field){
		switch (field) {
			case "Especialidad":
				this.turnos.sort(this.compareEspecialidad);
				break;

			case "Fecha":
				this.turnos.sort(this.compareFecha);
				break;

			case "Nombre":
				this.turnos.sort(this.compareApellido);
				break;
		}
	}

	compareEspecialidad(a, b) {
		if(a.especialista == null){
			return 1;
		}
		if(b.especialista == null){
			return -1;
		}
		return a.especialista.localeCompare(b.especialista);
	}

	compareFecha(a, b) {
		console.log(a.fecha);
		return a.fecha.localeCompare(b.fecha);
	}

	compareApellido(a, b) {
		if(a.apellido == null && b.apellido == null)
			return 0;
		if(a.apellido == null )
			return 1;

		if(b.apellido == null )
			return -1;	
		return a.apellido.localeCompare(b.apellido);
	}
}
