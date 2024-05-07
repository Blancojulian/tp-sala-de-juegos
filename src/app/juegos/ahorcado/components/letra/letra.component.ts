import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-letra',
  standalone: false,
  templateUrl: './letra.component.html',
  styleUrl: './letra.component.css'
})
export class LetraComponent {

  @Input() public datoLetra: string = "";
  estaSeleccionado = false;
  esCorrecto: boolean | null = null;
  @Output() onEnviarDato = new EventEmitter<{letra: string, setEsCorrecto: (bool: boolean)=>void}>();
  //el padre podria emitir un evento que envie la palabra y el componente letra lo interpreta
  //no sirve
  onClick() {
    if (!this.estaSeleccionado) {
      //alert('click');
      this.estaSeleccionado = true;
      this.enviarDato();
    }
  }
  enviarDato() {
    this.onEnviarDato.emit({
      setEsCorrecto: this.setEsCorrecto.bind(this),
      letra: this.datoLetra
    });
  }
  private setEsCorrecto(esCorrecto: boolean) {    
    this.esCorrecto = !!esCorrecto;
  }
}
