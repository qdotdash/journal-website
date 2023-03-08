<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['page-overflow'])

defineProps(['pageNumber', 'pageText', 'pageDate'])

const textareaRef = ref<HTMLInputElement>()
const remnantText = ref('')

const onTextAreaInputChange = () => {
  const textarea = textareaRef?.value
  if(textarea && textarea.value.length > 1600){
    emits('page-overflow', remnantText.value, textarea.value)
  }
  // if (
  //   textarea &&
  //   textarea.scrollHeight &&
  //   textarea.offsetHeight &&
  //   textarea.scrollHeight > textarea.offsetHeight
  // ) {
  //   if (textarea.value.slice(-1) !== ' ' && textarea.value.split(' ').length !== 1) {
  //     remnantText.value = textarea.value.split(' ').pop() || ''
  //   }
  //   emits('page-overflow', remnantText.value, textarea.value)
  // }
  console.log(textarea?.value.length)
}
</script>

<template>
  <div class="page-container">
    <div class="date">{{ pageDate }}</div>
    <textarea
      ref="textareaRef"
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
