<script setup lang="ts">
const emits = defineEmits(['input'])

defineProps(['pageNumber', 'pageText', 'pageDate'])

const onTextAreaInputChange = (event: Event) => {
  const { value } = event.target as HTMLInputElement
  emits('input', value)
}
</script>

<template>
  <div class="page-container">
    <div class="date">{{ pageDate }}</div>
    <textarea
      id="journal-textarea"
      class="page-textarea"
      ref="textareaRef"
      placeholder="Journal here..."
      @input="onTextAreaInputChange"
      :value="pageText"
    ></textarea>
    <div class="page-number">{{ pageNumber }}</div>
  </div>
</template>

<style>
.page-container {
  height: 800px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #e4dede;
}
.page-textarea {
  height: 100%;
  width: 100%;
  font-size: 22px;
  font-family: 'JournalFont', sans-serif;
  line-height: 40px;
  color: black;
  border: none;
  box-sizing: border-box;
  background-color: inherit;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  text-align: justify;
}

.page-number {
  font-size: 22px;
  font-family: 'JournalFont', sans-serif;
  line-height: 40px;
}

.date {
  font-size: 22px;
  font-family: 'JournalFont', sans-serif;
  line-height: 40px;
  color: #1b1b1b;
  align-self: flex-end;
}
</style>
