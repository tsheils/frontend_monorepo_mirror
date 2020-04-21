"use strict";
import {Observable} from "rxjs";

const neo4jUser= "neo4j";
const neo4jPassword = "eic1akeghaTha4OhKahr";
const neo4j = require('neo4j-driver');
const webSocketServer = require('websocket').server;
const http = require('http');
// const uri = "bolt://0.0.0.0:7687";
 const uri = "bolt://gard-dev-neo4j.ncats.io:7687";

 /**
 * this is the default uri for a neo4j instance running locally
 */
const driver = neo4j.driver(uri, neo4j.auth.basic(neo4jUser, neo4jPassword), {connectionPoolSize: 50});

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'gard-data';

/**
 *  Port where we'll run the websocket server
 *  note, this should be wss
 */
const webSocketsServerPort = 1338;

// websocket and http servers
/**
 * HTTP server
 */
let server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
let wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket request is just
  // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server,
    maxReceivedFrameSize: 131072,
    maxReceivedMessageSize: 10 * 1024 * 1024
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  // accept connection - you should check 'request.origin' to make sure that
  // client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  const connection = request.accept(null, request.origin);
  console.log((new Date()) + ' Connection accepted.');

  // user sent some message
  /**
   * this reads the message, and passes it to the neo4j connection, returning the results
   */
  connection.on('message', function(message) {
    const session = driver.rxSession();
    const mes = JSON.parse(message.utf8Data);
    if (mes.txcType) {
      let subscription: Observable<any>;
      switch (mes.txcType) {
        case 'write': {
          subscription = session.writeTransaction(txc => txc.run(mes.call, mes.params).records());
          break;
        }
        case 'read':
        default: {
          subscription = session.readTransaction(txc => txc.run(mes.call, mes.params).records());
          break;
        }
      }
      subscription.subscribe({
        next: res => {
          connection.send(JSON.stringify(res.toObject()));
        },
        complete: () => {
          connection.close();
          session.close();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  },

  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer "
      + connection.remoteAddress + " disconnected.");
  }));

});
