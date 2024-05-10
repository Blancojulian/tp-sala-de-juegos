import { Injectable } from '@angular/core';
import { User, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly userState$;//: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.userState$ = authState(this.auth);
  }

  public async register(email: string, password: string, displayName: string | null = null, photoURL: string | null = null) {
    const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credentials.user, {displayName, photoURL});
    return credentials;
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public async logout() {
    //this.auth.signOut()
    await signOut(this.auth);
    if (this.router.url.includes('chat') || this.router.url.includes('juegos')) {
      await this.router.navigateByUrl('/home');
    }
  }
}
