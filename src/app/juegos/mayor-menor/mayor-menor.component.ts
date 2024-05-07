import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {

  cartaActual: number = this.getCartaAleatoria();
  proximaCarta!: number;
  rotarCarta = false;
  puntos = 0;

  adivinarMenor() {
    this.adivinarCarta(false);
  }
  adivinarMayor() {
    this.adivinarCarta(true);
  }
  private adivinarCarta(esMayor: boolean) {

    if (!this.rotarCarta) {
      
      let nuevaCarta!: number;
      let ultimaCarta: number = this.cartaActual;
  
      do {
        nuevaCarta = this.getCartaAleatoria();
      } while (nuevaCarta === ultimaCarta);
      this.proximaCarta = nuevaCarta;
      this.rotarCarta = true;
  
      if ((esMayor && nuevaCarta > ultimaCarta) || (!esMayor && nuevaCarta < ultimaCarta)) {
        //this.ganoPartida = false;
        this.puntos++;
        
      } else if (ultimaCarta !== nuevaCarta) {
        this.puntos = 0;
        Swal.fire({
          icon: 'error',
          title: 'Mensaje',
          text: esMayor ? 'Perdio, la carta es menor' : 'Perdio, la carta es mayor'
        })
      }
      setTimeout(()=>{
        this.rotarCarta = false;
        this.cartaActual = nuevaCarta;
      }, 800);
    }
  }


  private getCartaAleatoria() {
    const min = 1;
    const max = 12;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
