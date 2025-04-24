// src/services/signaling.js
// Hier implementierst du die Kommunikation mit dem Signaling-Server

import io from 'socket.io-client';

class Signaling {
  constructor(url) {
    this.socket = io(url);

    this.socket.on('connect', () => {
      console.log('Connected to signaling server');
      // Hier kannst du Logik für die verbundene Verbindung einfügen
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from signaling server');
      // Hier kannst du Logik für die getrennte Verbindung einfügen
    });

    this.socket.on('error', (error) => {
      console.error('Signaling server error:', error);
      // Hier kannst du Logik für Fehler einfügen
    });

    this.socket.on('message', (message) => {
        console.log('Message from signaling server:', message);
        // Hier wird die Logik für Nachrichten vom Signaling-Server eingebaut
    })
  }

  // Hier implementierst du Methoden, um Nachrichten zu senden und zu empfangen
  sendMessage(message) {
    this.socket.emit('message', message);
  }
}

export default Signaling;