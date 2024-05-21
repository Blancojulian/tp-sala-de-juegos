import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subscription, map, tap } from 'rxjs';
import { DetallePreguntas } from './interfaces/detalle-preguntas';
import { Categorias } from '../../enums/categorias';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  public datallePreguntas: DetallePreguntas | null = null;

  constructor(private http: HttpClient) { }

  getPreguntas() {
    const observable = this.http.get('https://api.quiz-contest.xyz/questions?limit=10&page=3&category=geography', {
      headers: new HttpHeaders({ 'Authorization': environment.apiKeyPreguntados })
    }) as Observable<DetallePreguntas>;
    
    observable.pipe(tap((r)=>{
      console.log('hola');
      
      console.log(r);
      
    }),
      map((r)=>{
        console.log('hola 1');
        
        console.log(r);
      })
    )
    return observable;

  }

  seleccionarPreguntas(categoria: string) {
    const url = new URL('https://api.quiz-contest.xyz/questions?limit=10&page=1');
    url.searchParams.append('category', categoria);
    console.log(url.toString());
    
    const observable = this.http.get(url.toString(), {
      headers: new HttpHeaders({ 'Authorization': environment.apiKeyPreguntados })
    }) as Observable<DetallePreguntas>;

    return observable;
  }

  async getCategorias() {
    const KEY = '$2b$12$wb4znHGZ.29NAJYVDJ6inuURFyWuQFX7phCs80qBKqRzcrIY8jX3a';
    const url = 'https://api.quiz-contest.xyz/questions?limit=10&page=1&category=sports%26leisure';
    try {
      const data = await fetch('https://api.quiz-contest.xyz/questions?limit=10&page=3&category=geography', {
        headers: new Headers({ 'Authorization': KEY })
      });
      console.log(data);
      const res = await data.json();
      console.log(res);

      return res;

    } catch (err) {
      console.log('error');

      console.log((err as Error).message);

    }
  }

}
