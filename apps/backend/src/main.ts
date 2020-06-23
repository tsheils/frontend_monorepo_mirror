"use strict";

const neo4j = require('neo4j-driver');
const WebSockets = require('ws');


const neo4jUser= "neo4j";
const neo4jPassword = "vei1jeiceiK3Ohyaelai";
const uri = "bolt://gard-dev.ncats.io:7687";

const driver = neo4j.driver(uri, neo4j.auth.basic(neo4jUser, neo4jPassword), {connectionPoolSize: 50});

 process.title = 'gard-data';

/**
 *  Port where we'll run the websocket server
 */
const wss = new WebSockets.Server({ port: 1338 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(message);
    const session = driver.rxSession();
    const mes = JSON.parse(message);
    if (mes.txcType) {
      let subscription;
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
          ws.send(JSON.stringify({origin: mes.origin, data: res.toObject(), params: mes.params}));
        },
        complete: (res) => {
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  });
  ws.on('error', error => {
    console.log(error);
  });
  ws.on('close', ws=> {
    console.log((new Date()) + " Peer "
      + ws.remoteAddress + " disconnected.");  })
});
