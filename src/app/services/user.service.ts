import { Injectable } from '@angular/core';

import { User } from '../models/User';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor(private router: Router) {
    // this.user = new User(-1,"error","Guest","GUEST");
    this.user = new User(1,"tester","tester","USER");
  }

  login(username: string, password: string): string{
    if( username === "wnr" && password === "wnr" ){
      this.user =  new User(1,username,password,"USER");
      this.router.navigate(['/dashboard']);
    }
    else{
      return "Wrong username or password!";
    }
    return "";
  }

  logout(){
    this.user = new User(-1,"error","Guest","GUEST");
    this.router.navigate(['/']);
  }
}
