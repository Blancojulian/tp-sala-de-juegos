import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollToLastDirective } from './directives/scroll-to-last.directive';


@NgModule({
  declarations: [ChatComponent, ChatMessagesComponent, MessageItemComponent, ScrollToLastDirective],
  imports: [
    FormsModule,
    CommonModule,
    ChatRoutingModule,
    NgClass,
  ]
})
export class ChatModule { }
