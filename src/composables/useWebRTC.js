// src/composables/useWebRTC.js
import { ref, onUnmounted } from 'vue';
import { useChatStore } from '../stores/chat';
import useWebSocket from './useWebSocket';

export default function useWebRTC() {
  const chatStore = useChatStore();
  const { peerConnection, localStream, remoteStream, setLocalStream, setRemoteStream, connectionState, peerId, signalingServerStatus } = chatStore;
  const signalingServerUrl = 'http://localhost:3000';

  const { signaling, signalingServerStatus: signalingStatus, sendMessage } = useWebSocket(signalingServerUrl);

  // Konfiguration für die STUN/TURN-Server
  const config = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      // Füge hier weitere STUN/TURN-Server hinzu, falls nötig
    ],
  };

  // Erstellen einer neuen Peer-Verbindung
  function createPeerConnection() {
    peerConnection.value = new RTCPeerConnection(config);
    peerConnection.value.onicecandidate = handleICECandidateEvent;
    peerConnection.value.ontrack = handleTrackEvent;
    peerConnection.value.onnegotiationneeded = handleNegotiationNeededEvent;
    peerConnection.value.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
  }

  // Funktion zum Erhalten des lokalen Streams
  async function getLocalStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }

  // ICE Candidate Event-Handler
  function handleICECandidateEvent(event) {
    if (event.candidate) {
      console.log('ICE Candidate:', event.candidate);
      sendMessage(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
    }
  }

  // Track Event-Handler
  function handleTrackEvent(event) {
    console.log('Track event received', event)
    setRemoteStream(event.streams[0]);
  }

  // Negotiation Needed Event-Handler
  async function handleNegotiationNeededEvent() {
    try {
      console.log('Negotiation needed');
      const offer = await peerConnection.value.createOffer();
      await peerConnection.value.setLocalDescription(offer);
      sendMessage(JSON.stringify({ type: 'offer', offer: offer }));
      console.log('Local Description set', offer);
    } catch (error) {
      console.error('Error during negotiation:', error);
    }
  }


  // ICE Connection State Change Event-Handler
  function handleICEConnectionStateChangeEvent() {
    console.log('ICE Connection State Changed:', peerConnection.value.iceConnectionState);
    connectionState.value = peerConnection.value.iceConnectionState;
  }

  // Hinzufügen von Tracks zum PeerConnection
  function addLocalTracks() {
    localStream.value.getTracks().forEach((track) => {
      peerConnection.value.addTrack(track, localStream.value);
    });
  }
  
    signaling.socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === 'candidate') {
            peerConnection.value.addIceCandidate(parsedMessage.candidate);
        } else if (parsedMessage.type === 'answer') {
            peerConnection.value.setRemoteDescription(parsedMessage.answer);
        } else if (parsedMessage.type === 'offer'){
            handleOffer(parsedMessage.offer)
        }
    });

      async function handleOffer(offer){
        try{
            await peerConnection.value.setRemoteDescription(offer);
            const answer = await peerConnection.value.createAnswer();
            await peerConnection.value.setLocalDescription(answer);
            sendMessage(JSON.stringify({ type: 'answer', answer }));
        }catch(e){
            console.error(e)
        }
    }




  onUnmounted(() => {
    if (peerConnection.value) {
      peerConnection.value.close();
    }
  });

  return {
    createPeerConnection,
    getLocalStream,
    addLocalTracks
  };
}