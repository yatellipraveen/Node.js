import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-wallpage',
  templateUrl: './wallpage.component.html',
})
export class WallpageComponent implements OnInit {
  posts;
  formToggle: boolean = false;
  constructor(private http: HttpService, private router : Router, private user: UserServiceService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.http.getPosts().subscribe((posts) => {
      this.posts = <any>posts;
    },err=>{
      this.user.logout();
      this.router.navigateByUrl('/login');
    });
  }

  toggleForm() {
    this.formToggle = this.formToggle ? false : true;
  }

  onNewPost() {
    this.getPosts();
  }
}
