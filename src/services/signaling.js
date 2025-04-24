// src/signaling.js
import { io } from 'socket.io-client';

class Signaling {
    constructor() {
        this.url = 'https://p2p-chat-signaling.onrender.com/';
        this.socket = io(this.url);

        this.socket.on('connect', () => {
            console.log('connected to signaling server');
        });
        this.socket.on('disconnect', () => {
            console.log('disconnected from signaling server');
        });
    }

    sendMessage(message) {
        this.socket.emit('message', message);
    }
}

export default Signaling;
