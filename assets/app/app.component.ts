import { Component } from '@angular/core';
// import { Message } from './messages/message.model';
import { MessageService } from './messages/message.service'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent {
  //Set the property to the model and initialize it
  // messages: Message[] = [
  //   new Message('Some message', 'Benito Camela'),
  //   new Message('Another awesome message', 'Rosa Melcacho'),
  //   new Message('3rd message', 'Rosa Melcacho')
  // ];
}
