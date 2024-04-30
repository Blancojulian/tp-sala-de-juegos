import { Injectable } from '@angular/core';
import { User, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, updateProfile } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly userState$;//: Observable<User | null>;

  constructor(private auth: Auth) {
    this.userState$ = authState(this.auth);
  }

  public isLoggedIn() {
    return !!this.auth.currentUser;
  }
  public async register(email: string, password: string, displayName: string | null = null, photoURL: string | null = null) {
    const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credentials.user, {displayName, photoURL});
    return credentials;
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public logout() {
    //this.auth.signOut()
    return signOut(this.auth);
  }
}
