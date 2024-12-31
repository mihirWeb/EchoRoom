import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080});
// console.log(wss);

interface User {
    socket: WebSocket;
    roomId: string;
    name: string
}

let allSockets: User[] = [];

// When a user connects to the server
wss.on("connection", (socket) => {
    

    // When a user sends a message
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if(parsedMessage.type === "join") {
            const user: User = {
                socket,
                roomId: parsedMessage.payload.roomId,
                name: parsedMessage.payload.name
            }
            allSockets.push(user);
            socket.send(`Room ${parsedMessage.payload.roomId} joined`)
        }else if (parsedMessage.type === "chat"){
            let user: User;
            allSockets.forEach((s) => {
                if(s.socket === socket){
                    user = s;
                }
            })
            allSockets.forEach((s) => {
                if(s.roomId === user.roomId){
                    s.socket.send(`${user.name}: ${parsedMessage.payload.message}`)
                }
            })
        }
    }); 
        
});


// the below are the formats in which server can recieve instructions from the client

// Tpye 1: To join a room
// {
//     "type": "join",
//     "payload": {
//       "roomId": "123",
//       "name": "name"
//     }
// }


// Type 2: To send a message
// {
// 	"type": "chat",
// 	"payload": {
// 		"message: "hi there",
//      "name": "name"
// 	}
// }

// for that we will make a interface 