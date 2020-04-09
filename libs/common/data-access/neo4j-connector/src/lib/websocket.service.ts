import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
subject: WebSocketSubject<any>;
  constructor() {

     this.subject = webSocket('ws://localhost:1338');
/*
    subject.subscribe();
// Note that at least one consumer has to subscribe to the created subject - otherwise "nexted" values will be just buffered and not sent,
// since no connection was established!

    subject.next({message: 'some message'});
// This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!

    subject.complete(); // Closes the connection.

    subject.error({code: 4000, reason: 'I think our app just broke!'});
// Also closes the connection, but let's the server know that this closing is caused by some error.*/
  }
}
