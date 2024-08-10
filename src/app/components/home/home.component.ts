import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/WebSocket/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private subscription!: Subscription;
  messages: string[] = [];

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.subscription = this.websocketService.connect('ws://localhost:8080')
    .subscribe(event => {
      this.messages.push(event.data);
    });
  }

  sendMessage(message: string): void {
    this.websocketService.sendMessage(message);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.websocketService.close();
  }

}
