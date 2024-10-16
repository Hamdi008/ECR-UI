import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/Authentication/auth.service';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true;
  
  data = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password :""
  }
  constructor(private authService: AuthService, private dialogRef: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

 
  getErrorMessage() {
    if (this.data.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.data.email.hasError('email') ? 'Not a valid email' : '';
  }

  openDialog(title:String, msg: String){
    this.dialogRef.open(PopupComponent,{
      data : {
        title: title,
        msg: msg
      }
    });
  }

  onLogin(): void {
    this.authService.login(this.data.email.value, this.data.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.openDialog("Sign In", "You are successfully Signed In!");
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.openDialog("Sign In", "Sign In failed!");
      }
    });
  }

}
