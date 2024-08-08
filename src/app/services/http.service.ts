import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  private url = 'http://127.0.0.1:3000/';

  createUser(user: any){
    return this.http.post(this.url + 'user/addUser', user);
  }
}
