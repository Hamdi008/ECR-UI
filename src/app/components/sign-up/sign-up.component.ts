import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = {
    fullname: '',
    email: '',
    password:''
  }
  constructor(private _http:HttpService) { }

  ngOnInit(): void {
  }

  signUp(){
    this._http.createUser(this.user)
    .subscribe(
      res=>{
        console.log(res);
        this.user = {
          fullname: '',
          email: '',
          password : ''
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
}
