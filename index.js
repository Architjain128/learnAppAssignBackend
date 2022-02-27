import WebSocket from "ws";
import { startNewRound, addToRound } from "./utils";

// SCRIPT ARGUMENTS
const args = process.argv.slice(2);
// aggregation intervals in ms
const interval = parseInt(args[0], 10) || 30000;
// no of aggregation rounds to perform
const rounds = parseInt(args[1], 10) || 10;

console.log(`INFO | interval: ${interval} ms | rounds: ${rounds}\n`);
const url = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const ws = new WebSocket(url);

ws.on("open", function open() {
  console.log(`connected to ${url}\nStarting aggregation\n`);
});

ws.on("close", (event) => {
  console.log("\ndisconnected");
});

let currentRound = 0;
let currentEpochBucket = 0;
ws.on("message", function message(event) {
  const data = JSON.parse(event.toString());

  // creating bucket based on interval given
  data.T = data.T - (data.T % interval);
  // new round
  if ((data.T - currentEpochBucket) / interval >= 1) {
    currentEpochBucket = data.T;
    startNewRound(data);
    currentRound += 1;
    if (currentRound > rounds) {
      ws.terminate();
    }
  } else {
    // else add to previous round
    addToRound(data);
  }

});
