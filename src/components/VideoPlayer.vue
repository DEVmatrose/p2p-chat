<template>
  <div class="video-player">
    <h2>Video Player</h2>
    <video ref="localVideo" autoplay muted playsinline />
    <video ref="remoteVideo" autoplay playsinline />
    <div class="controls">
      <button @click="toggleMute">Mute/Unmute</button> <button
        @click="toggleCamera"
      >
        Camera On/Off
      </button>
      <button @click="startRecording">Start Recording</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import useWebRTC from '../composables/useWebRTC';
import { useChatStore } from '../stores/chat';
import { storeToRefs } from 'pinia';
export default {
  name: 'VideoPlayer',
  setup() {
    const isMuted = ref(false);
    const isCameraOn = ref(true);
    const isRecording = ref(false);
    const localVideo = ref(null);
    const remoteVideo = ref(null);

    const chatStore = useChatStore();
    const { localStream, remoteStream } = storeToRefs(chatStore);

    const { createPeerConnection, getLocalStream, addLocalTracks } =
      useWebRTC();

    onMounted(async () => {
      createPeerConnection();
      await getLocalStream();
      addLocalTracks();
    });

    onUnmounted(() => {});

    const toggleMute = () => {
      isMuted.value = !isMuted.value;
      if (localStream.value) {
        localStream.value.getAudioTracks().forEach((track) => {
          track.enabled = !isMuted.value;
        });
      }
    };

    const toggleCamera = () => {
      isCameraOn.value = !isCameraOn.value;
      if (localStream.value) {
        localStream.value.getVideoTracks().forEach((track) => {
          track.enabled = isCameraOn.value;
        });
      }
    };

    const startRecording = () => {
      if (!isRecording.value) {
        console.log('Start recording');
        isRecording.value = true;
      } else {
        console.log('Stop recording');
        isRecording.value = false;
      }
    };

    return {
      isMuted,
      isCameraOn,
      isRecording,
      localVideo,
      remoteVideo,
      localStream,
      remoteStream,
      toggleMute,
      toggleCamera,
      startRecording,
    };
  },
  watch: {
    localStream: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.$refs.localVideo.srcObject = newVal;
        }
      },
    },
    remoteStream: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.$refs.remoteVideo.srcObject = newVal;
        }
      },
    },
  },
};
</script>

<style scoped>
.video-player {
  display: flex;
  flex-direction: column;
}

video {
  width: 320px;
  height: 240px;
  border: 1px solid black;
}

.controls {
  display: flex;
  gap: 10px;
}
</style>