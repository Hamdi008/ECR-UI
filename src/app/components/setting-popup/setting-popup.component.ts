import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/services/SharedData/shared-data.service';

@Component({
  selector: 'app-setting-popup',
  templateUrl: './setting-popup.component.html',
  styleUrls: ['./setting-popup.component.css']
})
export class SettingPopupComponent implements OnInit {

  constructor(public _sharedData: SharedDataService, public dialogRef: MatDialogRef<SettingPopupComponent>) { }

    // default settings
    settings = {
      communicationMode: 'single',
      communicationType: 'Client',
      serverAddress: 'ws://192.168.116.249:',
      portNumber: '50000',
      selectedServerName: 'UPP',
    }

  ngOnInit(): void {
  }

  closePopup() {
    this.dialogRef.close();
  }
  saveSettings(){
    this._sharedData.settings = {
      communicationMode : this.settings.communicationMode,
      communicationType : this.settings.communicationType,
      serverAddress : this.settings.serverAddress,
      portNumber : this.settings.portNumber,
      selectedServerName : this.settings.selectedServerName,
  }
  this.closePopup();
}
}
