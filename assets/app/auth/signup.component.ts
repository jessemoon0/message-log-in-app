import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//Service
import { AuthService } from './auth.service'
//The model
import { User } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
  myForm: FormGroup;

  constructor(private authService: AuthService) {}

  //When the component is created, the form is created as well
  ngOnInit(){
    //Here we register the controls we have. The key is the name of the
    //control and the value is how the control is configured.
    this.myForm = new FormGroup({
      //Many arguments: 1st is the initial state (initial value),
      //2nd is the validation you want to use (required)
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      //For many validators use an array
      email: new FormControl(null, [
        Validators.required,
        //Email validator patterns vary a lot and can be found on the web
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(){
    //For testing only
    // console.log(this.myForm);

    //We set up the fields on the ngOnInit method
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.firstName,
      this.myForm.value.lastName
    );
    //Subscribe to Observable
    this.authService.signup(user)
    .subscribe(
      data => console.log(data),
      error => console.error(error)
    );
    this.myForm.reset();
  }
}
