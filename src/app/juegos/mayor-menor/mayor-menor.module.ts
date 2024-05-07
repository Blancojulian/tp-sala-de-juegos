import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { MayorMenorRoutingModule } from './mayor-menor-routing.module';
import { MayorMenorComponent } from './mayor-menor.component';
import { CartaComponent } from './components/carta/carta.component';
import { BotonComponent } from './components/boton/boton.component';


@NgModule({
  declarations: [MayorMenorComponent, CartaComponent, BotonComponent],
  imports: [
    CommonModule,
    MayorMenorRoutingModule,
    NgClass
  ],
  exports: [MayorMenorComponent]
})
export class MayorMenorModule { }
