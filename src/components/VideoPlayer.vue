<template>
  <div class="video-player">
    <h2>Video Player</h2>
    <video ref="localVideo" autoplay muted playsinline></video>
    <video ref="remoteVideo" autoplay playsinline></video>
    <div class="controls">
      <button @click="toggleMute">Mute/Unmute</button>
      <button @click="toggleCamera">Camera On/Off</button>
      <button @click="startRecording">Start Recording</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  data() {
    return {
      isMuted: false,
      isCameraOn: true,
      isRecording: false,
    };
  },
  mounted() {
    this.setupMedia();
  },
  methods: {
    async setupMedia() {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        this.$refs.localVideo.srcObject = this.localStream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.localStream) {
        this.localStream.getAudioTracks().forEach((track) => {
          track.enabled = !this.isMuted;
        });
      }
    },
    toggleCamera() {
      this.isCameraOn = !this.isCameraOn;
      if (this.localStream) {
        this.localStream.getVideoTracks().forEach((track) => {
          track.enabled = this.isCameraOn;
        });
      }
    },
    startRecording() {
      if (!this.isRecording) {
          console.log('Start recording');
          this.isRecording = true;
      } else {
          console.log('Stop recording');
          this.isRecording = false;
      }
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