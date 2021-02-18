import { Directive, TemplateRef, ViewContainerRef, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appDirectiva]'
})
export class DirectivaDirective {

  @Input()
  set appDirectiva(doctor: any) {
    var color;
    if(doctor.hoursTime.length <= 3 && doctor.hoursTime.length >= 1){
      color = "yellow";
    }
    else if(doctor.hoursTime.length == 0){
      color = "red";
    }
    else if(doctor.hoursTime.length >= 4){
      color = "green";
    }

    this.el.nativeElement.style.backgroundColor = color;
  }

  constructor(private el:ElementRef) {
    console.log("Directiva", el);


   }
}
