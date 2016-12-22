//Tutorial in messages part

//Make the service Injectable
import { Injectable } from "@angular/core";
//The model
import { User } from './user.model';

//Add HTTP Service
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";


@Injectable()
export class AuthService {

  constructor(private http: Http){}

  signup(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => Observable.throw(error.json()));;
  }

  signin(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type':'application/json'});
    //Added /signin
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => Observable.throw(error.json()));;
  }

  logout(){
    localStorage.clear();
  }

  isLoggedIn(){
    return localStorage.getItem('token')!== null;
  }
}
