import { Component, OnInit } from '@angular/core';
import { Error } from './error.model';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  //Nice gray background-color, fixes position and expands over the full width
  //and height
  styles: [`
    .backdrop {
      background-color: rgba(0, 0, 0, 0.6);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }
  `]
})

export class ErrorComponent implements OnInit {
  error: Error;

  constructor(private errorService: ErrorService){}

  //By default error is hidden.
  display = 'none';

  //Modal dissapears on closing
  onErrorHandled(){
    this.display = 'none';
  }

  //So this function listen to errors triggered in message service
  ngOnInit(){
    this.errorService.errorOccurred
    .subscribe(
      (error:Error) => {
        this.error = error;
        this.display = 'block';
      }
    );
  }
}
