import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080});
// console.log(wss);

let userCount = 0;
let allSockets: WebSocket[] = [];

// When a user connects to the server
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount++;
    console.log(`User connected. Total users: ${userCount}`);

    // When a user sends a message
    socket.on("message", (message) => {
        console.log(`Received message: ${message}`); // up untill here one way communication is done

        // Send the message to all users
        allSockets.forEach((s) => {
            if (s !== socket) {
                s.send(`sent the message: ${message}`);
            }
        });
    }); 
        
});

