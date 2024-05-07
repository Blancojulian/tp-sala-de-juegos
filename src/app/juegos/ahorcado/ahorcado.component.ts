import { Component } from '@angular/core';
import { LetraComponent } from './components/letra/letra.component';
import { PalabraComponent } from './components/palabra/palabra.component';
import { AhorcadoDirective } from './directives/ahorcado.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  //ir quitando las letras equivocadas del array y volver a dibujar
  //sino mostrar la letra incorrecta deshabilitada
  private _letras: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  private palabras: string[] = ['piedra', 'papel', 'tijera'];
  palabra!: string;
  palabraIncompleta!: string;
  public intentos = 0;
  public limite = 6;
  public ganoPartida: boolean | null = null;
  get letras(): string[] {
    return this._letras;  
  }

  constructor() {
    this.nuevaPartida();
  }
  recibirDato(obj: any) {
    if (this.ganoPartida === null) {
      
      const esCorrecto = this.palabra.includes(obj.letra);
      obj.setEsCorrecto(esCorrecto);
      if (esCorrecto) {
        this.palabraIncompleta = this.completarPalabra(this.palabraIncompleta, this.palabra, obj.letra);
      } else {
        this.intentos++;
      }

      if (this.intentos >= this.limite) {
        this.ganoPartida = false;
        Swal.fire({
          icon: 'error',
          text: 'Perdio'
        });
      } else if (this.palabraIncompleta === this.palabra) {
        this.ganoPartida = true;
        Swal.fire({
          icon: 'success',
          text: 'Gano'
        });
      }

      if (this.ganoPartida !== null) {
        this.nuevaPartida();
      }
    }
  }


  private nuevaPartida(){
    const ultimaPalabra = this.palabra;
    let palabra!: string;
    do {
      palabra = this.palabras[Math.floor(Math.random()*this.palabras.length)];
      
    } while (ultimaPalabra === palabra);

    this.palabra = palabra;
    this.palabraIncompleta = '_'.repeat(palabra.length);
    this._letras = [...this._letras];
    this.intentos = 0;
    this.ganoPartida = null;
  }

  private completarPalabra(palabraIncompleta: string, palabra: string, letra: string) {

    const arrPalabraIncompleta = [...palabraIncompleta];
    
    for (let i = 0; i < palabra.length; i++) {
      if (letra === palabra.charAt(i)) {
        arrPalabraIncompleta[i] = letra;
      }
      
    }
    return arrPalabraIncompleta.join('');
  }

}
