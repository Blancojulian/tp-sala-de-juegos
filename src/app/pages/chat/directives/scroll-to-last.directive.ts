import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appScrollToLast]',
  standalone: false
})
export class ScrollToLastDirective implements AfterViewChecked {

  @Input() appScrollToLast!: any;
  private _lastRef = this.appScrollToLast; 
  constructor(
    private el: ElementRef<HTMLDivElement>
  ) {
    //this.el.nativeElement.innerText = 'hola';
  }

  ngAfterViewChecked(): void {
    if (this._lastRef !==  this.appScrollToLast) {
      console.log('en ngAfterViewChecked' + Date.now());
      this.el.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: 'end',
        inline: 'end'
      });
      this._lastRef = this.appScrollToLast;
    }
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appScrollToLast']) {
      this.el.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: 'end',
        inline: 'end'
      });
      console.log('en chages de scroll last');
      }
  }
}
