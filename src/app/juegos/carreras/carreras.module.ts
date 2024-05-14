import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrerasRoutingModule } from './carreras-routing.module';
import { CarrerasComponent } from './carreras.component';
import { AutoComponent } from './components/auto/auto.component';
import { BotonComponent } from './components/boton/boton.component';
import { ArbolComponent } from './components/arbol/arbol.component';


@NgModule({
  declarations: [CarrerasComponent, AutoComponent, BotonComponent, ArbolComponent],
  imports: [
    CommonModule,
    CarrerasRoutingModule
  ]
})
export class CarrerasModule { }
