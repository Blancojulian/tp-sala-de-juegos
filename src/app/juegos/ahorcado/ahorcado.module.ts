import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { LetraComponent } from './components/letra/letra.component';
import { AhorcadoComponent } from './ahorcado.component';
import { PalabraComponent } from './components/palabra/palabra.component';
import { AhorcadoDirective } from './directives/ahorcado.directive';
import { PersonajeComponent } from './components/personaje/personaje.component';


@NgModule({
  imports: [
    NgClass,
    CommonModule,
    AhorcadoRoutingModule
  ],
  declarations: [AhorcadoComponent, LetraComponent, PalabraComponent,AhorcadoDirective, PersonajeComponent],
  exports: [AhorcadoComponent]
})
export class AhorcadoModule { }
