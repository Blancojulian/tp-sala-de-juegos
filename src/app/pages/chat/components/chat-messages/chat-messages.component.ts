import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Subscription } from 'rxjs';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  public chatsCollection: any[] = [];
  private sub!: Subscription;
  @Input() public userId: string | null = null;
  
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.sub = this.chatService.chatUpdate$.subscribe((c)=> {
      c.sort((a,b)=> a['fecha'] - b['fecha'])
      this.chatsCollection = c;
      console.log(c);
      console.log(c[0]['fecha']);
      console.log('arriba mensajes');
      
      
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
