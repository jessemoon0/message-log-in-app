//Component for creating new messages or editing them
import { Component, OnInit } from '@angular/core';
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

export class MessageInputComponent implements OnInit{
  //We hook up with the ngModel HTML attribute by property binding.
  messageLoadedOnEdit: Message;
  //We create the messageService property and pass the methods of the
  //MessageService class in message.service.ts
  constructor(private messageService: MessageService){}

  // onSave(value: string) {
  //   const message = new Message(value, 'Jessie');
  //   this.messageService.addMessage(message);
  // }

  //Parameter of type: NgForm.
  //Add the message through a service to the messages array (no HTTP)
  // onSubmit(form: NgForm) {
  //   // console.log(form);
  //   const message = new Message(form.value.content, 'Jessie');
  //   this.messageService.addMessage(message);
  //   form.resetForm();
  // }

  onSubmit(form: NgForm) {
    //Editing a message, otherwise we would be creating. IF editing is true...
    if(this.messageLoadedOnEdit){
      //Editing a message, otherwise we would be creating
      this.messageLoadedOnEdit.content = form.value.content;

      this.messageService.updateMessage(this.messageLoadedOnEdit)
      .subscribe(
        result => console.log(result)
      );
      //Clear the content after submitting the update
      this.messageLoadedOnEdit = null;
    }
    //This code is triggered if we are not in EDIT mode (code before edit Feature)
    else {
      const message = new Message(form.value.content, 'Jessie');
      this.messageService.addMessage(message)
      //Subscribe to the Observable
      .subscribe(
        //1st Argument: What happens if everything works ok
        data => console.log(data),
        //2nd Argument: What happens if its an error. (3rd arg is ommited)
        error => console.error(error)
      );
    }
    form.resetForm();
  }

  //The subscription to the messageIsEdit (so it subscribe to any event that
  //gets emitted)
  ngOnInit(){
    this.messageService.messageIsEdit.subscribe(
      //The property gets the message passed through the EventEmitter
      (message: Message) => this.messageLoadedOnEdit = message
    );
  }

  onClear(form: NgForm){
    form.resetForm();
    this.messageLoadedOnEdit = null;
  }
}
