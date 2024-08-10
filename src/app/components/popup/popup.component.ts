import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  title;
  msg;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.title = data.title
    this.msg = data.msg
  }

  ngOnInit(): void {
  }
}
