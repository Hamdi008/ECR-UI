import { Component, OnInit, ViewChild  } from '@angular/core';
import { WebsocketService } from 'src/app/services/WebSocket/websocket.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SettingPopupComponent } from '../setting-popup/setting-popup.component';
import { SharedDataService } from 'src/app/services/SharedData/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public connectionStatus = 'Disconnected';

  constructor(private websocketService: WebsocketService, private matDialogRef: MatDialog, public _sharedData: SharedDataService) {}

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  openDialog(title: String, msg:String){
    this.matDialogRef.open(SettingPopupComponent,{
      data : {
        title: title,
        msg:msg
      }
    });
  }

  OpenSettingDialog(){
    this.openDialog("", "");
  }

  closeSettings() {
    console.log("closeSettings");
    this._sharedData.settings.communicationMode = "multiple"
  }

  onModeChange(mode: string) {
    this._sharedData.settings.communicationMode = mode; // Update the selected mode
    this.closeSettings(); // Close the settings popup
  }

}
