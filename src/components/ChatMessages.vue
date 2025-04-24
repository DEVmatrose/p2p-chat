<template>
  <div class="chat-messages">
    <h2>Chat Messages</h2>
    <ul>
      <li v-for="message in messages" :key="message.timestamp" :class="message.sender">
        <span v-if="message.type === 'text'">{{ message.content }}</span>
        <span v-else-if="message.type === 'file'">{{ message.content }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { useChatStore } from '../stores/chat.js';
import { storeToRefs } from 'pinia';

export default {
  name: 'ChatMessages',
  setup() {
    const chatStore = useChatStore();
    const { messages } = storeToRefs(chatStore);

    return {
      messages,
    };
  },
};
</script>

<style scoped>
.chat-messages {
  border: 1px solid #ccc;
  padding: 10px;
  width: 300px;
  height: 200px;
  overflow-y: auto;
}

.me {
  text-align: right;
  color: blue;
}

.peer {
  text-align: left;
  color: green;
}
</style>