import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataBaseConnectionService } from './../../../services/database-connection.service';

@Component({
	selector: 'app-lista-usuario',
	templateUrl: './lista-usuario.component.html',
	styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

	constructor(public databaseConnection: DataBaseConnectionService) { }

	@Input() usuario;
	@Output() usuarioSeleccionado = new EventEmitter();

	usuarios = [];

	ngOnInit(): void {
		this.databaseConnection.bringEntity(DataBaseConnectionService.users, this.usuarios);
	}

	seleccionar(usuario) {
		this.usuarioSeleccionado.emit(usuario);
	}

}
