import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';
import { Subscription, take, tap } from 'rxjs';
import { User, UserInfo } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean = false;// = this.authService.isLoggedIn();
  userInfo: UserInfo | null = null;
  sus: Subscription;
  constructor(private authService: AuthService) {
    this.sus = this.authService.userState$.subscribe((user)=> {
      this.isLogged = !!user;
      this.userInfo = user;
    });
  }

  ngOnInit(): void {
    //this.isLogged = this.authService.isLoggedIn();
    //this.isLogged = this.authService.userState$.pipe(take(1), tap((user)=> !!user));
    
  }
  ngOnDestroy(): void {
    this.sus.unsubscribe();
  }

  async logout() {

    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Mensaje',
        text: 'Usuario no esta logueado',
        heightAuto: false
      });
    }
    this.isLogged = this.authService.isLoggedIn();

  }
}
