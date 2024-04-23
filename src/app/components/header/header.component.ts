import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLogged = this.authService.isLoggedIn();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    
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
