import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  private _letras: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  private palabras: string[] = ['piedra', 'papel', 'tijera'];
  private intentos = 6;
  palabra = '';
  public readonly refreshLetras$ = new Subject<void>();
  get letras(): string[] {
    return this._letras;
  };

  constructor() { }


  public seleccionarNuevaPalabra(){
    const ultimaPalabra = this.palabra;
    let palabra;
    do {
      palabra = this.palabras[Math.floor(Math.random()*this.palabras.length)];
      
    } while (ultimaPalabra === palabra);

    this.palabra = palabra;
    this._letras = [...this._letras];
    //this.refreshLetras$.next()
  }
}
