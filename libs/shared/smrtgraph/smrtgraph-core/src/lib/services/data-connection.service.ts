import {Inject, Injectable, Optional} from '@angular/core';
import {Subject} from 'rxjs';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

@Injectable()
export class DataConnectionService {

  responses: WebSocketSubject<any>;

  public messages: Subject<any> = new Subject<any>();

  constructor(
    @Inject('wsUrl') @Optional() private websocketUrl?: string
  ) {
    this.responses = webSocket(this.websocketUrl);

    this.responses.subscribe(
      msg => msg, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );

    this.messages.subscribe(message => {
      this.responses.next(message)})
  }
} //  end class DataService
