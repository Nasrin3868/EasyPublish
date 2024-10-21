import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppHighlight]'
})
export class AppHighlightDirective {

  @HostBinding('style.backgroundColor') backgroundColor!:string
  constructor() { 
    this.backgroundColor=''
  }
  @HostListener('mouseenter')onEnter(){
    this.backgroundColor='yellow'
  }
  @HostListener('mouseleave')onLeave(){
    this.backgroundColor=''
  }

}
