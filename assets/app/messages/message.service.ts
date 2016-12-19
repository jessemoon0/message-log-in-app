import { Message } from './message.model';

//Central messages array to manage all my messages
//All this methods now will be available in all components

export class MessageService {
  //Set as private so is not accesable from outside
  private messages: Message[] = [];

  //Add a new message to this central array
  addMessage(message: Message){
    this.messages.push(message);
    //See the whole array after adding a new message.
    console.log(this.messages);
  }

  //Return messages array so we have access to it
  getMessages(){
    return this.messages;
  }

  editMessage(){

  }

  //Start at the index of the message im passing and remove just that message (1)
  deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}
