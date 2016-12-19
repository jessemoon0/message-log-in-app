//First, the list was in AppComponent but for auth (that goes in AppComponent)
//the list must be trasferred here
import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service'
import { Message } from './message.model';

@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
    <app-message
      [inputMessage]="message"
      (editClicked)="message.content = $event"
      *ngFor="let message of messages">
    </app-message>
    </div>
  `
  //With this, Ang2 can do the operation of injecting the service
  //in the constructor. WE CAN ONLY USE IN THIS COMPONENT.
  //Remember this instance is different from other components
  //so INFORMATION IS NOT SHARED
  //providers: [MessageService]
})
//By putting implements OnInit, requires that I put the
//OnInit method or I will get an error. BEST PRACTICE
export class MessageListComponent implements OnInit {
  // messages: Message[] = [
  //   new Message('Some message', 'Benito Camela'),
  //   new Message('Another awesome message', 'Rosa Melcacho'),
  //   new Message('3rd message', 'Rosa Melcacho')
  // ];

  //NOTICE THIS VARIABLE IS THE SAME AS THE ONE ON THE SERVICE
  //This is because messages (array) is a reference type in JS
  messages: Message[];

  constructor(private messageService: MessageService){}

  ngOnInit(){
    this.messages = this.messageService.getMessages();
  }
}
