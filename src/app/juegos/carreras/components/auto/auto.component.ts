import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrl: './auto.component.css'
})
export class AutoComponent {
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() h: number = 0;
  @Input() w: number = 0;
  @Input() medida: string = 'px';
  @Input() src: string = './../../../../../assets/img/carreras/auto-resize.png';

  constructor() {
    /*setInterval(()=>{
      console.log('positionX '+this.x);
      console.log('positionY '+this.y);
      
    }, 2000)*/
  }
}
