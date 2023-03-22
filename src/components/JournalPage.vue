<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['page-overflow', 'on-text-change'])

defineProps(['pageNumber', 'pageText', 'pageDate'])

const textareaRef = ref<HTMLInputElement>()

const onTextAreaOverFlow = (e: UIEvent) => {
  const textarea = textareaRef.value
  if (!textarea) {
    return
  }
  const event = e as UIEvent & { target: HTMLTextAreaElement }

  let nextPageText = ''
  let currentPageText = event.target.value
  let scrollTop = event.target.scrollTop
  while (scrollTop > 0) {
    nextPageText += currentPageText[currentPageText.length - 1]
    currentPageText = currentPageText.slice(0, -1)
    textarea.value = currentPageText
    scrollTop = textarea.scrollTop
  }
  emits('page-overflow', nextPageText, currentPageText);
}

const onTextAreaInputChange = (e: Event) => {
  const event = e as Event & { target: HTMLTextAreaElement }
  emits('on-text-change', event.target.value)
}
</script>

<template>
  <div class="page-container">
    <div class="date">{{ pageDate }}</div>
    <textarea
      ref="textareaRef"
      @scroll="onTextAreaOverFlow"
      placeholder="Start journaling..."
      @input="onTextAreaInputChange"
      id="journal-textarea"
      class="page-textarea"
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
