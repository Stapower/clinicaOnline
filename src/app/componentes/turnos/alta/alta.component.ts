import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

  constructor() { }

  turno = {
    "cliente" : "",
    "id" : "" ,
    "documento" : "",
    "especialista" : "",
    "descripcion" : "",
    "fecha" : ""
  };

  especialistas = [];

  ngOnInit(): void {
  }

  crear(){
    
  }

}
