import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import {FormControl, Validators,FormGroupDirective, NgForm,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true; // Controls the visibility of the password

    user = {
    fullname: ' ',
    email: new FormControl('', [Validators.required, Validators.email]),
    password:''
  }
  constructor(private _http:HttpService, private matDialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  matcher = new MyErrorStateMatcher();

  getErrorMessage() {
    if (this.user.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.user.email.hasError('email') ? 'Not a valid email' : '';
  }


  togglePasswordVisibility() {
    this.hide = !this.hide; // Toggle the visibility state
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
          email: new FormControl('', [Validators.required, Validators.email]),
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
