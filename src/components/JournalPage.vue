<script setup lang="ts">
import { isTextAreaOverflowing } from '@/utils/utils'
import { ref } from 'vue'

const emits = defineEmits(['page-overflow', 'on-text-change'])

defineProps(['pageNumber', 'pageText', 'pageDate'])

const textareaRef = ref<HTMLInputElement>()
const lastNonOverFlowIndex = ref(-1)

const handlePageOverFlow = (text: string) => {
  const length = text.length
  for (let i = lastNonOverFlowIndex.value + 2; i <= length; i++) {
    console.log(isTextAreaOverflowing(text.substring(0, i), textareaRef.value), ' overflow test')
    if (isTextAreaOverflowing(text.substring(0, i), textareaRef.value)) {
      emits('page-overflow', text.substring(i, length), text.substring(0, i))
      return
    }
  }
}

const onTextAreaInputChange = () => {
  const textarea = textareaRef?.value
  console.log('textarea', textarea)
  // emits('on-text-change', textarea?.value)
  if (
    textarea &&
    textarea.scrollHeight &&
    textarea.offsetHeight &&
    textarea.scrollHeight > textarea.offsetHeight
  ) {
    handlePageOverFlow(textarea.value)
  } else {
    if (textarea) {
      lastNonOverFlowIndex.value = textarea.value.length - 1
    }
  }
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
