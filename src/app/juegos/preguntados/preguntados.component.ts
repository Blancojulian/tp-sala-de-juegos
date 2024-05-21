import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PreguntadosService } from './preguntados.service';
import { Subscription } from 'rxjs';
import { Pregunta } from './interfaces/pregunta';
import { shuffleArray } from '../../utils/utils';
import { Categorias } from '../../enums/categorias';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit, OnDestroy {
  @ViewChild('categoriaElem') selectElem!: ElementRef<HTMLSelectElement>;
  private sub!: Subscription;
  opcionesPreguntas: string[] = [];
  listaPreguntas: Pregunta[] = [];
  preguntaActual: string = '';
  categoriaActual: string = '';
  respuestaCorrecta: string = '';
  currentIndex = 0;
  categoria: string = '';
  puntaje = 0;
  estaJugando = false;
  public estaContestada = false;


  constructor(private preguntadosService: PreguntadosService) {

  }

  get categorias() {
    return Categorias;
  }

  ngOnInit(): void {
    this.sub = this.preguntadosService.getPreguntas().subscribe((i)=> {
      this.listaPreguntas = i.questions;
      
    });
    this.preguntadosService.seleccionarPreguntas(Categorias.CienciaNaturaleza);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  agregarPreguntas() {
    if (this.categoria === '') {
      console.log('Debe seleccionar Categoria');
      return;
    }

    const opt = this.selectElem.nativeElement.options[this.selectElem.nativeElement.selectedIndex].text;
    console.log(opt);
    
    this.categoriaActual = opt || '';

    const sub = this.preguntadosService.seleccionarPreguntas(this.categoria).subscribe((d)=>{
      this.estaJugando = true;
      this.listaPreguntas = d.questions;
      this.currentIndex = 0;
      this.puntaje = 0;
      const p = this.listaPreguntas[this.currentIndex];

      if (p) {
        this.setPregunta(p);
      }

      sub.unsubscribe();
    })
    
  }

  public siguientePregunta(){
    this.currentIndex++;
    const p = this.listaPreguntas[this.currentIndex];
    if (p) {
      this.estaContestada = false;
      //this.limpiar();
      this.setPregunta(p);
    } else {
      this.estaJugando = false
      Swal.fire('Termino');   
    }
  }
  private setPregunta(pregunta: Pregunta){

      //armar nuevo array de string con la pregunta correcta y las incorrectas
      this.respuestaCorrecta = pregunta.correctAnswers;
      this.preguntaActual = pregunta.question;
      //this.categoriaActual = pregunta.category;
      const arrAux = [... pregunta.incorrectAnswers, pregunta.correctAnswers];
      shuffleArray(arrAux);
      this.opcionesPreguntas = arrAux;
    
  }
  verificarRespuesta(event: Event, respuesta: string) {
    if (this.estaContestada) {
      return;
    }
    const target = event.currentTarget as HTMLDivElement;
    this.estaContestada = true;
    if (respuesta === this.respuestaCorrecta) {
      this.puntaje++;
      target.classList.add('correcta');      
    } else {
      target.classList.add('incorrecta');
    }

    //this.siguientePregunta();
  }

  volverAJugar() {
    this.estaJugando = false;
  }

}
