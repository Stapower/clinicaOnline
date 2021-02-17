import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(date) {

    var d = new Date(date);

    return this.weekday[d.getDay()] 
            + " "
            + d.getDate() 
            + " de " 
            + this.monthly[d.getMonth()];
    //return "LUNES";
  }

  weekday =[ 
		"Domingo",
		"Lunes",
		"Martes",
		"Miercoles",
		"Jueves",
		"Viernes",
		"Sabado"
  ];
    
  monthly = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];


}
