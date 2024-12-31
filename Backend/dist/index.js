"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log(wss);
let userCount = 0;
// When a user connects to the server
wss.on("connection", (socket) => {
    userCount++;
    console.log(`User connected. Total users: ${userCount}`);
    // When a user sends a message
    socket.on("message", (message) => {
        console.log(`Received message: ${message}`); // up untill here one way communication is done
        setTimeout(() => {
            socket.send(`You sent: ${message}`); // used to send message back to the client(the one who sent the message)
        }, 1000);
    });
});
