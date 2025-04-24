<template>
  <div class="message-input">
    <h2>Message Input</h2>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
    <input type="file" @change="selectFile" />
    <button @click="sendFile" :disabled="!selectedFile">Send File</button>
  </div>
</template>

<script>
export default {
  name: 'MessageInput',
  data() {
    return {
      newMessage: '',
      selectedFile: null,
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        console.log('Sending message:', this.newMessage);
        // Send message logic here
        this.newMessage = '';
      }
    },
    selectFile(event) {
      this.selectedFile = event.target.files[0];
    },
    sendFile() {
      if (this.selectedFile) {
        console.log('Sending file:', this.selectedFile);
        // Send file logic here
        this.selectedFile = null;
      }
    },
  },
};
</script>

<style scoped>
.message-input {
  display: flex;
  gap: 10px;
  align-items: center;
}

input[type="text"] {
  flex-grow: 1;
}
</style>