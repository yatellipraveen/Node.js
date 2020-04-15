import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { HttpService } from '../http.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm =new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  });

  constructor(private http: HttpService, private cookie: CookieService, private router : Router, private user: UserServiceService) { }

  ngOnInit(): void {
  }
  onLogin(){
    this.http.userAuthentication(this.loginForm.value).subscribe((data:{status: string})=>{
      if(data.status==='ok'){
        this.router.navigateByUrl('/wallpage');
        this.http.getUser().subscribe((user : {email:string})=>{
          this.user.setUserData(user.email);
        });
        
      }
    });
    this.loginForm.reset();
  }

}
