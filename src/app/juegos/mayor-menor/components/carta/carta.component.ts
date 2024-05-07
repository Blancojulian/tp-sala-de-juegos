import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent {
  @Input() numeroCarta!: number | string;
  @Input() extensionImagen: string = '.jpg';
}
