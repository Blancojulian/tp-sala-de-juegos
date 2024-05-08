import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionChanges, collectionData } from '@angular/fire/firestore';
import { Message } from './interfaces/message';
import { Subscription } from 'rxjs';
import { collection } from '@firebase/firestore';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //public chatsCollection: Message[] = [];
  //private sub!: Subscription;
  public readonly chatUpdate$;

  constructor(private firestore: Firestore) {

    //const q = query(collection(db, "cities"), where("capital", "==", true));
    let col = collection(this.firestore, 'chats');
    //query
    this.chatUpdate$ = collectionData(col);
  }

  async enviarMensaje(userId: string, nombre: string, texto: string) {
    
    const col = collection(this.firestore, 'chats');
    await addDoc(col, { fecha: new Date(), userId: userId, nombre: nombre, texto: texto});

  }
  /*
  getData(){
    let col = collection(this.firestore, 'mensajes');
    
    const observable = collectionChanges(col);

    this.sub = observable.subscribe((respuesta:any) => {
      this.chatsCollection = respuesta;
      console.log(respuesta);
    });

  }

  stopData() {
    this.sub?.unsubscribe();
  }*/
}
