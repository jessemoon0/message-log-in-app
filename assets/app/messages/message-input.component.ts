//Component for creating new messages or editing them
import { Component } from '@angular/core';
import { MessageService } from './message.service'
import { Message } from './message.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
  //With this, Ang2 can do the operation of injecting the service
  //in the constructor. WE CAN ONLY USE IN THIS COMPONENT.
  //Remember this instance is different from other components
  //so INFORMATION IS NOT SHARED
  //providers: [MessageService]
})

export class MessageInputComponent {

  //We create the messageService property and pass the methods of the
  //MessageService class in message.service.ts
  constructor(private messageService: MessageService){}

  // onSave(value: string) {
  //   const message = new Message(value, 'Jessie');
  //   this.messageService.addMessage(message);
  // }

  //Parameter of type: NgForm
  onSubmit(form: NgForm) {
    // console.log(form);
    const message = new Message(form.value.content, 'Jessie');
    this.messageService.addMessage(message);
    form.resetForm();
  }

}
