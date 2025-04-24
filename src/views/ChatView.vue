<template>
  <div>
    <h1>Chat View</h1>
    <div id="chat-container">
      <VideoPlayer />
      <ChatMessages />
      <MessageInput />
      <FileTransferUI />
    </div>
  </div>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue";
import ChatMessages from "../components/ChatMessages.vue";
import MessageInput from "../components/MessageInput.vue";
import FileTransferUI from "../components/FileTransferUI.vue";

export default {
  name: "ChatView",
  components: {
    VideoPlayer,
    ChatMessages,
    MessageInput,
    FileTransferUI,
  },
};
</script>

<style scoped>
#chat-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>