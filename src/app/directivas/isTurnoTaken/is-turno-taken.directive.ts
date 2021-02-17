import { Directive, TemplateRef, ViewContainerRef, ElementRef, Input, HostListener } from '@angular/core';
import { DataBaseConnectionService } from '../../services/database-connection.service';

@Directive({
  selector: '[appIsTurnoTaken]'
})
export class IsTurnoTakenDirective {

  turnos = [];
  constructor(private el:ElementRef, public databaseConnection : DataBaseConnectionService) { 
  }

  @Input()
  set appIsTurnoTaken(fechaHoraDocumento : string) {
    
    var arra = fechaHoraDocumento.split('@');
    var fecha = arra[0];
    var hora = arra[1];
    var documento = arra[2];

    var fechaDate = new Date(fecha);
    console.log(" appIsTurnoTaken fecha", fechaDate);
    console.log(" appIsTurnoTaken fecha millis ", fechaDate.getTime());
    console.log("appIsTurnoTaken hora", hora);
    console.log("appIsTurnoTaken documento", this.turnos);
    //console.log("appIsTurnoTaken documento result2", DataBaseConnectionService.turnosCache);


    var istaken = false;
    console.log("IsTaken", istaken);
    //this.databaseConnection.isTurnoTaken(fechaDate, hora, documento, istaken, this.databaseConnection.turnosEnCache());
    console.log("IsTaken 2", istaken);

    if(istaken){
      console.log("was taken 2", istaken);

      this.el.nativeElement.disabled = true;
    }

    
    //this.el.nativeElement.style.backgroundColor = color;
  }

}
