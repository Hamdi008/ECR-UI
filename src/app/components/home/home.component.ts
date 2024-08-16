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

  private wsSubscription!: Subscription;
  private messages: any[] = []; // Array to store all incoming messages
  public connectionStatus = 'Disconnected';

  dataToSend = '';
  public formattedJson = '';

  
  public showSettingsPopup = false; // Controls visibility of the settings popup

  constructor(private websocketService: WebsocketService, private matDialogRef: MatDialog, public _sharedData: SharedDataService) {}

  ngOnInit() {
    // Connect to the WebSocket server and handle messages
    this.wsSubscription = this.websocketService.connect('ws://192.168.116.249:50000').subscribe(
      (message) => {
        if (message.type === 'open') {
          this.connectionStatus = 'Connected';
        } else if (message.type === 'message') {
          try {
            // Parse the incoming message data as JSON
            const jsonData = JSON.parse(message.data);
            this.messages.push(jsonData); // Append new data to the messages array
            this.formattedJson = JSON.stringify(this.messages, null, 2); // Format the entire messages array as JSON
          } catch (e) {
            console.error('Failed to parse JSON:', e);
            this.formattedJson = 'Invalid JSON received';
          }
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
        this.connectionStatus = 'Error';
      },
      () => {
        this.connectionStatus = 'Disconnected';
      }
    );
  }

  sendMessage() {
    console.log("Send a message to the WebSocket server= ${this.dataToSend}")
    this.websocketService.sendMessage(this.dataToSend); 
  }

  clearData() {
    this.messages = []; // Clear the messages array
    this.formattedJson = ''; // Clear the formatted JSON
  }

  ngOnDestroy() {
    // Unsubscribe and close the WebSocket connection when the component is destroyed
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.websocketService.close();
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

  openSettings() {
    this.showSettingsPopup = true; // Show the settings popup
  }

  closeSettings() {
    console.log("closeSettings");
    this.showSettingsPopup = false; // Hide the settings popup
    this._sharedData.settings.communicationMode = "multiple"
  }

  onModeChange(mode: string) {
    this._sharedData.settings.communicationMode = mode; // Update the selected mode
    this.closeSettings(); // Close the settings popup
  }

}
