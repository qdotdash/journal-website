<template>
  <div class="container">
    <JournalPage
      @on-text-change="onTextChange"
      :pageNumber="pageNumber"
      :pageText="pageText"
      :pageDate="pageDate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { formattedCurrentDate } from '@/utils/utils'

import JournalPage from './JournalPage.vue'

const pageNumber = ref<number>(1)
const pageText = ref<string>('')
const pageDate = ref<string>(formattedCurrentDate())

const onTextChange = (input: string) => {
  console.log(input)
}
</script>
