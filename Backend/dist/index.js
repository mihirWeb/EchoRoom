"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
// When a user connects to the server
wss.on("connection", (socket) => {
    // When a user sends a message
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            const user = {
                socket,
                roomId: parsedMessage.payload.roomId,
                name: parsedMessage.payload.name
            };
            allSockets.push(user);
            socket.send(`Room ${parsedMessage.payload.roomId} joined`);
        }
        else if (parsedMessage.type === "chat") {
            let user;
            allSockets.forEach((s) => {
                if (s.socket === socket) {
                    user = s;
                }
            });
            allSockets.forEach((s) => {
                if (s.roomId === user.roomId) {
                    s.socket.send(`${user.name}: ${parsedMessage.payload.message}`);
                }
            });
        }
    });
});
// the below are the formats in which server can recieve instructions from the client
// Tpye 1: To join a room
// {
//     "type": "join",
//     "payload": {
//       "roomId": "123"
//     }
// }
// Type 2: To send a message
// {
// 	"type": "chat",
// 	"payload": {
// 		"message: "hi there"
// 	}
// }
// for that we will make a interface 
