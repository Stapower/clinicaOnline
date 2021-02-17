import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

@Directive({
  selector: '[appAnimar]'
})
export class AnimarDirective {
  @Input('text-content') textContent: string;

  animationState = 'in';


  @Input()
  set appAnimar(x) {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    
    this.element.nativeElement.setAttribute('style', 'transition: top 1s ease 0s; -webkit-transition: background-color 500ms ease-out 1s; -moz-transition: background-color 500ms ease-out 1s; -o-transition: background-color 500ms ease-out 1s;    transition: background-color 500ms ease-out 1s;');
    /*
      	background-color:grey;

    */
    //this.renderer.setStyle(this.element, "opacity", 1);
  }
  /*
    constructor(private el:ElementRef, private renderer: Renderer2 ) {
      console.log("Directiva", el);

  }*/

  constructor(private element: ElementRef, private renderer: Renderer2 ) { }
}


