import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  ROOT_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  userAuthentication(userData) {
    return this.http.post(this.ROOT_URL + '/auth', userData, {
      withCredentials: true,
    });
  }

  getPosts() {
    return this.http.get(this.ROOT_URL + '/posts',{withCredentials: true});
  }
  getUser() {
    return this.http.get(this.ROOT_URL + '/user',{withCredentials:true});
  }

  addNewPost(newPost){
    return this.http.post(this.ROOT_URL+'/new-post',newPost ,{withCredentials:true} );
  }
}
