import { Injectable, EventEmitter } from "@angular/core";
import { Error } from './error.model';

export class ErrorService {
  //Emits an error of type Error (model)
  errorOccurred = new EventEmitter<Error>();

  handleError(error: any){
    //Error model, error object, error message property
    const errorData = new Error(error.title, error.error.message);
    //This emits the event, now we can SUBSCRIBE to handleError in components
    this.errorOccurred.emit(errorData);
  }
}
