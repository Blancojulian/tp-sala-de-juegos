import { Component, OnDestroy } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnDestroy {

  userInfo: UserInfo | null = null;
  texto!: string;
  private sub: Subscription;
  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.sub = this.authService.userState$.subscribe((u) => {
      this.userInfo = u;
    })
  }

  ngOnDestroy(): void {
   this.sub?.unsubscribe(); 
  }

  onSubmit() {
    if (this.texto && this.userInfo !== null) {
      this.chatService.enviarMensaje(this.userInfo.uid, this.userInfo?.displayName || 'Anonimo', this.texto); 
      this.texto = '';
      //alert('mensaje')
    }
  }
}
