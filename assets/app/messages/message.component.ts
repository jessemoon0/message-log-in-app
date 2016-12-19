import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service'


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
    .author {
      display: inline-block;
      font-style: italic;
      font-size: 12px;
      width: 80%;
    }
    .config {
      display: inline-block;
      text-align: right;
      font-size: 12px;
      width: 19%;
    }
  `]
})

export class MessageComponent{
  //We are using component property binding (@input('Alias') property)
  //Set the model and make the property assignable from outside.
  //Now is accesible in app.component.html

  @Input('inputMessage') message: Message;
  //We create the property and name it editClicked, which is an "EventEmitter"
  //of type string, so it can be emitted to app.component.ts
  @Output() editClicked = new EventEmitter<string>();

  //For attribute directive.
  // color: 'red';

  constructor(private messageService: MessageService){}

  onEdit(){
    //This means "Emit a new event". You can pass any data you want.
    this.editClicked.emit('This is my message string from message Component');
  }
  onDelete(){
      this.messageService.deleteMessage(this.message);
  }
}
