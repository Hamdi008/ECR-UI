import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/WebSocket/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-mode',
  templateUrl: './single-mode.component.html',
  styleUrls: ['./single-mode.component.css']
})
export class SingleModeComponent implements OnInit {


  private wsSubscription!: Subscription;
  private messages: any[] = []; // Array to store all incoming messages
  public connectionStatus = 'Disconnected';

  dataToSend = '';
  public formattedJson = '';

  constructor(private websocketService: WebsocketService) {}

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
}
