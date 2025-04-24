<template>
  <div class="file-transfer-ui">
    <h2>File Transfer</h2>
    <ul v-if="Object.keys(fileTransferProgress).length > 0">
      <li v-for="(fileData, fileId) in fileTransferProgress" :key="fileId">
        {{ fileData.name }} - {{ fileData.status }} ({{ fileData.progress.toFixed(2) }}%)
      </li>
    </ul>
    <p v-else>No active file transfers.</p>
  </div>
</template>

<script>
import { useChatStore } from '../stores/chat.js';
import { storeToRefs } from 'pinia';
export default {
  name: 'FileTransferUI',
  setup() {
    const chatStore = useChatStore();
    const { fileTransferProgress } = storeToRefs(chatStore);

    return {
      fileTransferProgress,
    };
  },
};
</script>

<style scoped>
.file-transfer-ui {
  border: 1px solid #ccc;
  padding: 10px;
  width: 300px;
  min-height: 100px;
}
</style>