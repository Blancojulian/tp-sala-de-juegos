import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrl: './personaje.component.css'
})
export class PersonajeComponent implements OnChanges{
  @Input() public intentosFallidos: number = 0;
  @Input() public limite: number = 0;
  //ver si es mejor pasar un array con las partes desde el padre
  public partes: { [key: string]: boolean } = {
    ocultarCabeza: true,
    ocultarTorso: true,
    ocultarBrazoDerecho: true,
    ocultarBrazoIzquiero: true,
    ocultarPiernaDerecho: true,
    ocultarPiernaIzquiero: true,
  }
  //[ngClass]="{'no-display': true}"
  //[ngClass]="{'no-display': this.partes['ocultarCabeza']}"
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['intentosFallidos']) {
      let cambios = 1;
      for (const key in this.partes) {
        if (cambios > this.intentosFallidos ) {
          break;
        }
        this.partes[key] = false;
        cambios++;
        console.log('cambios '+ cambios);
        console.log(this.partes);
        
      }

      if (this.intentosFallidos <= 0) {
        for (const key in this.partes) {
          this.partes[key] = true;
        
        }
      }
    }
  }
}
