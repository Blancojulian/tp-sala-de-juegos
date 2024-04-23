import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"tp-sala-de-juegos-acbe9","appId":"1:97274326812:web:0cee814f5ac2be463a54d9","storageBucket":"tp-sala-de-juegos-acbe9.appspot.com","apiKey":"AIzaSyDfRVHgFf_NTpWhIb5yFzgx4PMKpW9b6Kw","authDomain":"tp-sala-de-juegos-acbe9.firebaseapp.com","messagingSenderId":"97274326812"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
