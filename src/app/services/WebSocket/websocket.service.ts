import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;

  connect(url: string): Observable<any> {
    return new Observable((observer) => {
      this.socket = new WebSocket(url);

      this.socket.onopen = (event) => {
        console.log('WebSocket connection opened:', event);
        observer.next({ type: 'open', event });
      };

      this.socket.onmessage = (event) => {
        console.log('Received message from server:', event.data);
        observer.next({ type: 'message', data: event.data });
      };

      this.socket.onerror = (event) => {
        console.error('WebSocket error:', event);
        observer.error(event);
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        observer.complete();
      };

      // Return teardown logic in case the observable is unsubscribed
      return () => {
        this.socket.close();
      };
    });
  }

  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

}
