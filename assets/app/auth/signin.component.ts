//A lighter version of the signup Component
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Service
import { AuthService } from './auth.service'
//The model
import { User } from './user.model';
//Angular 2 Router to leave component in any line.
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent{
  //For a tutorial about Data Driven Forms, go to the Sign Up Component
  myForm: FormGroup;

  ngOnInit(){
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    //Just for testing
    // console.log(this.myForm);

    const user = new User(this.myForm.value.email, this.myForm.value.password);
    this.authService.signin(user)
    .subscribe(
      data => {
        //Store the token (Browser Local Storage). localStorage is a native JS var
        //Set the token to the data returned from Observable.
        localStorage.setItem('token', data.token);
        //The data.userId and data.token are the properties that come from
        //our server.
        localStorage.setItem('userId', data.userId);
        this.router.navigateByUrl('/');
      },
      error => console.error(error)
    );
    this.myForm.reset();
  }
}
