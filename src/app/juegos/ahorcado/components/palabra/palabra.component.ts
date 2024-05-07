import { Component, Input } from '@angular/core';
import { LetraComponent } from '../letra/letra.component';

@Component({
  selector: 'app-palabra',
  standalone: false,
  templateUrl: './palabra.component.html',
  styleUrl: './palabra.component.css'
})
export class PalabraComponent {
  @Input() public datoPalabra: string = "";
  @Input() public datoPalabraIncompleta: string = "";
}
