import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarrerasService } from './carreras.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent implements OnInit, OnDestroy {

  constructor(public carrerasService: CarrerasService) {
    this.carrerasService.setValues(400, 320);
    window.addEventListener('resize', this.carrerasService.setDimensions);
  }

  public jugar(event: Event) {
    event.preventDefault()
    this.carrerasService.agregarInputHandler();
    this.carrerasService.jugar();
  }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.carrerasService.quitarInputHandler();
    this.carrerasService.stop();
    this.carrerasService.enemigos = [];
    window.removeEventListener('resize', this.carrerasService.setDimensions);
  }
}
