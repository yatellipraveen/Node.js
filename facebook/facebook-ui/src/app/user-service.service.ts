import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  isLoggedIn=new Subject<boolean>();
  userEmail;
  userLoggedIn: boolean=false;
  constructor() { }

  setUserData(email){
    this.userEmail=email;
    this.userLoggedIn=true;
    this.isLoggedIn.next(this.userLoggedIn);
  }

  logout(){
    this.isLoggedIn.next(false);
  }

  isUserLoggedIn(){
    return this.userLoggedIn;
  }
}
