import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  // default settings
  public settings = {
    communicationMode: 'single',
    communicationType: 'Client',
    serverAddress: 'ws://127.0.0.1:50000',
    portNumber: '50000',
    selectedServerName: 'UPP'
  }


  // webSocket connection status
  connectionStatus = 'Disconnected'


}
