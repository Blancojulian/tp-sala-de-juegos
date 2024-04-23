import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, updateProfile } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  public isLoggedIn() {
    return !!this.auth.currentUser;
  }
  public async register(email: string, password: string, displayName: string | null = null, photoURL: string | null = null) {
    const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credentials.user, {displayName, photoURL});
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public logout() {
    //this.auth.signOut()
    return signOut(this.auth);
  }
}
