import { PdfMakeWrapper, Txt} from 'pdfmake-wrapper';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataBaseConnectionService } from './../../../services/database-connection.service';




@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  constructor(public databaseConnection : DataBaseConnectionService) {
  }

  @Output() turnoSeleccionado = new EventEmitter();
  @Input() rol;
  filterString;


  turnos = [];

  ngOnInit(): void {
    this.databaseConnection.bringEntity(DataBaseConnectionService.turno, this.turnos);
  }


  seleccionar(turno){
    this.turnoSeleccionado.emit(turno);
  }


  enter(event){

		if(event.key == "Enter"){
				this.databaseConnection.bringEntityWithFilterString2(DataBaseConnectionService.turno, this.turnos, this.filterString);
		}
	}

}
