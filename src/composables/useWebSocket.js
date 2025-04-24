// src/composables/useWebSocket.js
import { ref, onMounted, onUnmounted } from 'vue';
import Signaling from '../services/signaling';
import { useChatStore } from '../stores/chat';

export default function useWebSocket(signalingServerUrl) {
  const signalingServerStatus = ref('disconnected');
  const chatStore = useChatStore();
  chatStore.signalingServerStatus = signalingServerStatus;

  const signaling = new Signaling(signalingServerUrl);

  onMounted(() => {
    signalingServerStatus.value = 'connecting';
  })

  onUnmounted(() => {
    signaling.socket.disconnect();
  });

  const sendMessage = (message) => {
    signaling.sendMessage(message)
  }

  return { signaling, signalingServerStatus, sendMessage };
}