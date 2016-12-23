import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from './message.model';
import { ErrorService } from '../errors/error.service';

@Injectable()
//Central messages array to manage all my messages
//All this methods now will be available in all components
export class MessageService {
  //Set as private so is not accesable from outside
  private messages: Message[] = [];
  //For checking if the EDIT label is clicked
  messageIsEdit = new EventEmitter<Message>();

  //Set the HTTP Injector
  constructor(private http: Http, private errorService: ErrorService){}

  //Add a new message to this central array
  addMessage(message: Message){

    //Add a message to the property with the Message Model.
    //No HTTP Here. This is all we need for the frontend
    // this.messages.push(message);

    //See the whole array after adding a new message.
    // console.log(this.messages);

    //We inject the HTTP Service. First we convert our message to JSON.
    const body = JSON.stringify(message);
    //We need to set the headers so is in JSON format, we pass it in the 3rd arg
    //This is to avoid 500 error of server when we cant read the response.
    const headers = new Headers({'Content-Type':'application/json'});

    //AUTH. If token exists, add the query parameter. If terniary
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';

    //We create the Observable to be subscibed in the component.
    return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
    //The server full response is stored in (response: Response).
    //This .map() is taking away headers and status codes, extracting only the
    //response and formatting it to JSON
    //This response is more specific now, to store the ID field to update it
    .map((response: Response) => {
      const result = response.json();
      //As we get the full user object, we can get his associated user properties
      const newMessage = new Message(result.obj.content, result.obj.user.firstName, result.obj._id,result.obj.user._id);
      this.messages.push(newMessage);
      return newMessage;
    })
    //Error Handling:
    //Use Observable object to extract exact error and show it in JSON format
    .catch((error: Response) => {
      //So you get an specific error
      this.errorService.handleError(error.json());
      //Even with the errorService, catch expect this observable.
      return Observable.throw(error.json());
    });
  }

  //Return messages array so we have access to it
  getMessages(){
    //WITHOUT HTTP
    //return this.messages;

    //No need to send the other 2 params
    return this.http.get('http://localhost:3000/message')
    .map((response: Response)=> {
      //.obj is the name of the property that has our docs in the GET route.
      const messages = response.json().obj;
      //As the parameters of the message object are not like the DB model,
      //We need to transform the messages. First we set the model as empty.
      let transformedMessages: Message[] = [];
      //We loop in the messages variable that holds our response
      for(let message of messages){
        //Push to the array a new message extracting the content, the Username
        //and in the future,the ID and User ID. ORDER of Params is important.
        transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
      }
      //Keep in Sync the transformedMessages with our messages in the service
      //Important when we access the messages from other methods (must be updated)
      this.messages = transformedMessages;
      //.map() needs a return value to create the Observable.
      return transformedMessages;
    })
    .catch((error: Response) => {
      //So you get an specific error
      this.errorService.handleError(error.json());
      //Even with the errorService, catch expect this observable.
      return Observable.throw(error.json());
    });
  }

  //The service acts like a middle man between MessageComponent
  //and MessageInputComponent
  editMessage(message: Message){
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message){
    //Check addMessage for tutorial on this.
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type':'application/json'});

    //AUTH. If token exists, add the query parameter. If terniary
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';

    //Method is patch, we pass the ID to the URL. DONT FORGET THE '/' at the end
    //of the URL.
    return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      //So you get an specific error
      this.errorService.handleError(error.json());
      //Even with the errorService, catch expect this observable.
      return Observable.throw(error.json());
    });
  }

  //Start at the index of the message im passing and remove just that message (1)
  deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message), 1);

    //AUTH. If token exists, add the query parameter. If terniary
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';

    //Copy code from Update method
    return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      //So you get an specific error
      this.errorService.handleError(error.json());
      //Even with the errorService, catch expect this observable.
      return Observable.throw(error.json());
    });
  }
}
