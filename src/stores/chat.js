import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  // Verbindungsstatus
  const connectionState = ref('disconnected'); // 'connecting', 'connected', 'failed', 'disconnected'
  const peerId = ref(null); // ID des verbundenen Partners
  const signalingServerStatus = ref('disconnected'); // 'connecting', 'connected'

  // WebRTC Objekte (ggf. nicht direkt im Store, sondern in Composables)
  const localStream = ref(null);
  const remoteStream = ref(null);
  const peerConnection = ref(null); // Das RTCPeerConnection Objekt
  const dataChannel = ref(null); // Der WebRTC Data Channel

  // Nachrichten & Dateien
  const messages = ref([]); // Array von { sender: 'me'/'peer', type: 'text'/'file', content: '...', timestamp: ... }
  const fileTransferProgress = ref({}); // { fileId: { name, size, progress: 0-1, status: 'sending'/'receiving'/'done'/'failed' } }

  // Aufnahme-Status
  const recordingState = ref('idle'); // 'idle', 'requesting', 'waiting_consent', 'recording', 'denied'
  const canRecord = ref(false); // Hat der Peer zugestimmt?
  const isPeerRequestingRecording = ref(false); // Fragt der Peer gerade an?
  const isPeerRecording = ref(false); // Nimmt der Peer gerade auf? (Optional, zur Anzeige)

  // Aktionen (Beispiele, Logik kommt in Composables/Komponenten)
  function addMessage(message) {
    messages.value.push(message);
  }

  function setLocalStream(stream) {
    localStream.value = stream;
  }

  function setRemoteStream(stream) {
    remoteStream.value = stream;
  }

  // ... weitere Status und Aktionen

  return {
    connectionState,
    peerId,
    signalingServerStatus,
    localStream,
    remoteStream,
    peerConnection,
    dataChannel,
    messages,
    fileTransferProgress,
    recordingState,
    canRecord,
    isPeerRequestingRecording,
    isPeerRecording,
    addMessage,
    setLocalStream,
    setRemoteStream,
    // ...
  };
});