import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedin=false;
  private userObserver: Subscription;
  constructor(private user:UserServiceService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.loggedin=this.user.isUserLoggedIn();
    this.userObserver=this.user.isLoggedIn.subscribe(isloggedin=>{
      this.loggedin=isloggedin;
    });
  }

  ngOnDestroy(){
    this.userObserver.unsubscribe();
  }


}
