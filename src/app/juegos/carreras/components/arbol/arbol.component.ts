import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arbol',
  templateUrl: './arbol.component.html',
  styleUrl: './arbol.component.css'
})
export class ArbolComponent {

  @Input() public animar: boolean | null = true
}
