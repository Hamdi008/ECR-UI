import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;
  private subject: Subject<MessageEvent>;

  constructor() {
    this.subject = new Subject<MessageEvent>();
  }

  connect(url: string): Subject<MessageEvent> {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      this.subject.next(event);
    };

    this.socket.onclose = () => {
      this.subject.complete();
    };

    return this.subject;
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  close(): void {
    this.socket.close();
  }
}
