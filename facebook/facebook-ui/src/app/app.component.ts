import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from './user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  email;
  loggedin;
  private userObserver: Subscription;
  constructor(private cookie:CookieService,private user: UserServiceService){

  }
  ngOnInit(){
    if(this.cookie.get('username')){
      this.email=this.cookie.get('username');
    }
    this.userObserver=this.user.isLoggedIn.subscribe(isloggedin=>{
      this.loggedin=isloggedin;
      this.email=this.user.userEmail;
    });
  }

  logout(){
    this.user.logout();

  }

  ngOnDestroy(){
    this.userObserver.unsubscribe();
  }

}
