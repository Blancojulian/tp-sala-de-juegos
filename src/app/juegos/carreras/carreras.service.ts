import { Injectable } from '@angular/core';
import { Auto } from './clases/auto';
import { Observable, Subscription, TimeInterval, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private interval: Observable<number> = interval(10);
  private sub!: Subscription | null;
  private acumSegundos = 0;
  private audioLoop = new Audio('./../../../assets/audio/car-idle-loop.mp3')
  private audioChoque = new Audio('./../../../assets/audio/bonk.mp3')
  private _height = 0;
  private _width = 0;
  private _unidadMedida = 'px';
  private isMobile = false;
  private velocity = 2.5;
  public ganoPartida: boolean | null = null;
  public puntaje = 0;
  public enemigos: Auto[] = [];
  public player = {
    position: {
      x: 0,
      y: 0
    },
    height: 0,
    width: 0
  }
  private direction = {
    up: false,
    down: false,
    right: false,
    left: false,
  };


  constructor() {
    //no funciono el bind seguia perdiendo el this
    //this.move = this.move.bind(this);
    this.setDimensions = this.setDimensions.bind(this);
  }

  
  public get height() : string {
    return this._height + this._unidadMedida;
  }
  public get width() : string {
    return this._width + this._unidadMedida;
  }

  public get unidadMedida() : string {
    return this._unidadMedida;
  }

  private reiniciarVariables() {
    this.puntaje = 0;
    this.acumSegundos = 0;
    this.player.position.x = (this._width / 2) - (this.player.width / 2);
    this.player.position.y = this._height * 0.8;
    this.enemigos = [];
    this.audioLoop.loop = false;
    this.audioLoop.load();
    this.audioLoop.pause();
    Auto.reiniciarVelocidad();
  }

  setValues(height: number, width: number, unidadMedida = 'px') {
    console.log('innerHeight '+window.innerHeight+' innerWidth '+window.innerWidth);
    this._height = height;
    this._width = width;
    //this.setDimensions();
    this._unidadMedida = unidadMedida;
    this.player.height = this._height * 0.25;
    this.player.width = this._width * 0.20;
    //posicion inicial del jugador
    this.player.position.x = (this._width / 2) - (this.player.width / 2);
    this.player.position.y = this._height * 0.8;
    this.generarEnemigos();
    
  }

  private setDimensionsCar() {
    const esRutaLarga = this._height > this._width;
    if (esRutaLarga) {
      this.player.width = this._width * 0.15;
    }
  }

  public setDimensions() {
    console.log('innerHeight '+window.innerHeight+' innerWidth '+window.innerWidth);
    this._height = window.innerHeight * 0.70;
    this._width = window.innerWidth * (window.innerWidth < 400 ? 0.80 : 0.40);

    //ver
    this.player.height = this._height * 0.25;
    this.player.width = this._width * 0.15;
  }

  private generarEnemigos() {
    const cantidadMaxima = 5;
    let punto = [];
    let ultimoEjeY = 0;
    for (let i = 1; i <= cantidadMaxima; i++) {
      punto = this.getPuntoAleatorio(ultimoEjeY);
      this.enemigos.push(new Auto(this.player.height, this.player.width, punto[0], punto[1]));
      ultimoEjeY = punto[1];
    }
  }

  //retorna una tupla con el eje x y eje y
  private getPuntoAleatorio(ultimoEjeY: number = 0) {
    let distanciaMin = this.player.height * Math.random() + this.player.height;//no me gusta como queda el * 2;//ver el * 2
    let min = 0;
    let max = this._width - this.player.width;
    const ejeX = Math.floor(Math.random() * (max - min + 1) + min);
    const ejeY = (-distanciaMin) + ultimoEjeY//(min - this.player.height * (1+Math.random())) * orden;
    
    return [ejeX, ejeY];
  }

  private animarEnemigos() {
    for (let i = 0; i < this.enemigos.length; i++) {
      const e = this.enemigos[i];
      e.mover();

      if (this.estaChocando(e)) {
        this.ganoPartida = false;
        this.audioChoque.play();
        this.stop();
        console.log('Choco');
      }
      
      if (e.position.y > this._height) {
        this.enemigos.splice(i, 1);
        i--;
      }
    }

    if (this.enemigos.length <= 1) {
      this.generarEnemigos();
    }
  }

  private estaChocando(enemigo: Auto) {
    const colisionEjeX = (enemigo.position.x + enemigo.width) > this.player.position.x && (this.player.position.x + this.player.width) > enemigo.position.x;
    const colisionEjeY = (enemigo.position.y + enemigo.height) > this.player.position.y && (this.player.position.y + this.player.height) > enemigo.position.y;
    
    return colisionEjeX && colisionEjeY;
  }

  //no se deberia llamar mas de una vez, sino genera mas de una suscripcion que no desaparece con el stop
  //ver el if
  run() {
    if (!this.sub) {
      console.log('en run if');
      this.ganoPartida = null;
      
      this.sub = this.interval.subscribe(()=> {
        this.move();
        this.animarEnemigos();
        this.puntaje += 1;
        //console.log(Auto.velocity);
        this.acumSegundos += 10;
        if (this.acumSegundos > 1000) {
          Auto.agregarVelocidad();
          this.acumSegundos = 0;
    console.log('innerHeight '+window.innerHeight+' innerWidth '+window.innerWidth);

        }
      });
    }
    this.audioLoop.loop = true;
    this.audioLoop.volume = 0.2;
    this.audioLoop.load();
    this.audioLoop.play();
  }

  pause() {
    this.audioLoop.pause();
    this.sub?.unsubscribe();
    this.sub = null;//ver
  }
  jugar() {
    this.puntaje = 0;
    this.player.position.x = (this._width / 2) - (this.player.width / 2);
    this.player.position.y = this._height * 0.8;
    this.enemigos = [];
    this.generarEnemigos();
    this.run();
  }
  stop() {
    this.audioLoop.loop = false;
    this.audioLoop.load();
    this.audioLoop.pause();
    //this.enemigos = [];
    this.sub?.unsubscribe();
    this.sub = null;//ver
    Auto.reiniciarVelocidad();
  }
  //voy a usar position absolute con top y left
  //en el eje x empiezo de arriba a abajo y en el eje y de izquierda a derecha
  //para mover a la derecha sumo al eje y, contrario para la izquierda
  //para mover a abajo sumo al eje x, contrario para arriba
  private move() {
    //eje y
    if (this.direction.up && (this.player.position.y - this.velocity) > 0) {
      this.player.position.y -= this.velocity;
    }

    if (this.direction.down && (this.player.position.y + this.player.height + this.velocity) < this._height) {
      this.player.position.y += this.velocity;
    }

    //eje x
    if (this.direction.left && (this.player.position.x - this.velocity) > 0) {
      this.player.position.x -= this.velocity;
    }

    if (this.direction.right && (this.player.position.x + this.player.width + this.velocity) < this._width) {
      this.player.position.x += this.velocity;
    }

    //console.log(this.player.position);
    //console.log(this.direction);
    
  }

  private keydownHandler = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    if (key === 'a' ) {
      this.direction.left = true;
    }
    if (key === 'w') {
      this.direction.up = true;
    }
    if (key === 's') {
      this.direction.down = true;

    }
    if (key === 'd') {
      this.direction.right = true;
    }
    if (key === ' ') {
      this.velocity = 10;
      console.log('acelerar velocity '+this.velocity);
      
    }
    //this.move();
  }

  private keyupHandler = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (key === 'a' ) {
      this.direction.left = false;
    }
    if (key === 'w') {
      this.direction.up = false;
    }
    if (key === 's') {
      this.direction.down = false;
    }
    if (key === 'd') {
      this.direction.right = false;
    }
    if (key === ' ') {
      this.velocity = 2.5;
    }
    //this.move();
  }

  agregarInputHandler() {
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);
  }

  quitarInputHandler() {
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('keyup', this.keyupHandler);
  }
}
