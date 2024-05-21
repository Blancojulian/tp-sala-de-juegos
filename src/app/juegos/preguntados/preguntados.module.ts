import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadosRoutingModule } from './preguntados-routing.module';
import { PreguntadosComponent } from './preguntados.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormControl, FormsModule } from '@angular/forms';
import { AhorcadoDirective } from '../ahorcado/directives/ahorcado.directive';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AhorcadoModule } from '../ahorcado/ahorcado.module';



@NgModule({
  declarations: [PreguntadosComponent],
  imports: [
    CommonModule,
    PreguntadosRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule, MatInputModule,
    AhorcadoModule
  ]
})
export class PreguntadosModule { }
