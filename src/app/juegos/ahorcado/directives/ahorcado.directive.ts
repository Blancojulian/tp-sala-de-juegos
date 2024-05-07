import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAhorcado]',
  //standalone: false
})
export class AhorcadoDirective implements OnChanges {

  @Input() appAhorcado!: string[]
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appAhorcado']) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
