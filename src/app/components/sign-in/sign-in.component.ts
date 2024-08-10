import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/Authentication/auth.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  data = {
    email:"",
    password :""
  }
  constructor(private authService: AuthService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
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
    this.authService.login(this.data.email, this.data.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.openDialog("Sign In", "You are successfully Signed In!");
      },
      error: (error) => {
        this.openDialog("Sign In", "Sign In failed!");
      }
    });
  }

}
