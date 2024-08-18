import { Component, DoCheck, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/services/SharedData/shared-data.service';
import { WebsocketService } from 'src/app/services/WebSocket/websocket.service';


// Extend the FileSystemFileHandle interface
interface FileSystemFileHandle {
  createWritable(): Promise<FileSystemWritableFileStream>;
  getFile(): Promise<File>;
}

// Declare the writable stream type
interface FileSystemWritableFileStream extends WritableStream {
  write(data: any): Promise<void>;
  close(): Promise<void>;
}

@Component({
  selector: 'app-multiple-mode',
  templateUrl: './multiple-mode.component.html',
  styleUrls: ['./multiple-mode.component.css']
})
export class MultipleModeComponent implements OnInit, DoCheck  {

  private fileHandle: FileSystemFileHandle | null = null;
  private wsSubscription!: Subscription;
  private messages: any[] = []; // Array to store all incoming messages

  dataToSend = '';
  public formattedJson = '';

  constructor(private websocketService: WebsocketService, private sharedData: SharedDataService) {}

  ngOnInit() {
    console.log("ngOnInit Multiple: connect websocket")
    // Connect to the WebSocket server and handle messages
    this.wsSubscription = this.websocketService.connect(this.sharedData.settings.serverAddress + this.sharedData.settings.portNumber + '/upp/v1/device').subscribe(
      (message) => {
        if (message.type === 'open') {
          this.sharedData.connectionStatus = 'Connected';
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
        this.sharedData.connectionStatus = 'Error';
      },
      () => {
        this.sharedData.connectionStatus = 'Disconnected';
      }
    );
    
    if(this.sharedData.connectionStatus == 'Connected'){
      this.requestFileHandle();
    }
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
    console.log("ngOnDestroy Multiple: close websocket")

    // Unsubscribe and close the WebSocket connection when the component is destroyed
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.websocketService.close();
  }
  
  
  JsonResponseTextAreaContent: string = '';
  private previousJsonResponseTextAreaContentContent: string = '';

  ngDoCheck(): void {
    console.log(this.JsonResponseTextAreaContent)
    if (this.JsonResponseTextAreaContent !== this.previousJsonResponseTextAreaContentContent) {
      console.log('textArea2Content has changed');
      this.previousJsonResponseTextAreaContentContent = this.JsonResponseTextAreaContent;
      
      this.saveContentFromJsonResponseTextArea();
    }
  }


  private async requestFileHandle(): Promise<void> {
    try {
      this.fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: 'real-time-text.txt',
        types: [{
          description: 'Text Files',
          accept: { 'text/plain': ['.txt'] },
        }],
      });
    } catch (error) {
      console.error('File picker was canceled or an error occurred:', error);
    }
  }

  public async saveContentFromJsonRequestTextArea(): Promise<void> {
    if (this.fileHandle) {
      try {
        const textarea = document.getElementById('JsonRequestTextArea') as HTMLTextAreaElement;
        if (!textarea) {
          console.error('JsonRequestTextArea element not found');
          return;
        }
        const content1 = textarea.value;

        const file = await this.fileHandle.getFile();
        const currentContent = await file.text();

        let newContent = currentContent;
        if (content1) {
          newContent += content1 + '\n'; // Append content from the first textarea
        }

        const writable = await this.fileHandle.createWritable();
        await writable.write(newContent);
        await writable.close();

        console.log('Content from JsonRequestTextArea saved:', newContent);
      } catch (error) {
        console.error('Error writing to the file:', error);
      }
    }
  }

  public async saveContentFromJsonResponseTextArea(): Promise<void> {
    if (this.fileHandle) {
      try {
        const textarea = document.getElementById('JsonResponseTextArea') as HTMLTextAreaElement;
        if (!textarea) {
          console.error('JsonResponseTextArea element not found');
          return;
        }
        console.log('JsonResponseTextArea element is  found');
        const content2 = textarea.value;

        const file = await this.fileHandle.getFile();
        const currentContent = await file.text();

        let newContent = currentContent;
        if (content2) {
          newContent += content2 + '\n'; // Append content from the second textarea
        }

        const writable = await this.fileHandle.createWritable();
        await writable.write(newContent);
        await writable.close();

        console.log('Content from JsonResponseTextArea saved:', newContent);
      } catch (error) {
        console.error('Error writing to the file:', error);
      }
    }
  }


}