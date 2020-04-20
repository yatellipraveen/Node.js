import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent implements OnInit {
  newPost = new FormGroup({
    header: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });
  constructor(
    private http: HttpService,
    private cookie: CookieService,
    private router: Router,
    private user : UserServiceService
  ) {}

  ngOnInit(): void {}
  @Output('addedNewPost') addedPost = new EventEmitter<void>();
  onPost() {
    this.http
      .addNewPost({
        ...this.newPost.value,
        author: this.cookie.get('username'),
      })
      .subscribe(
        (res) => {
          this.addedPost.emit();
        },
        (err) => {
          this.user.logout();
          this.router.navigateByUrl('/login');
        }
      );
    this.newPost.reset();
  }
}
