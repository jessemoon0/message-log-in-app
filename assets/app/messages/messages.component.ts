//This component represents our hole messages feature.
//We moved the code from app.component
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  template: `
    <div class="row">
      <div>
        <app-message-input></app-message-input>
      </div>
      <hr>
      <div>
        <app-message-list></app-message-list>
      </div>
    </div>
  `
})

export class MessagesComponent {

}
