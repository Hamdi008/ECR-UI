import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

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
  constructor(private _http:HttpService, private matDialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(title: String, msg:String){
    this.matDialogRef.open(PopupComponent,{
      data : {
        title: title,
        msg:msg
      }
    });
  }

  signUp(){
    this._http.createUser(this.user)
    .subscribe(
      res=>{
        console.log(res);
        this.openDialog("Welcome " + this.user.fullname, "You are successfully Signed Up");
        this.user = {
          fullname: '',
          email: '',
          password : ''
        }
      },
      err=>{
        console.log(err);
        this.openDialog("Hi " + this.user.fullname, "Sign Up Failed");
      }
    )
  }
}
