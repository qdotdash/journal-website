<script setup lang="ts">
import { useJournalStore } from '@/stores/store'
import { formattedCurrentDate } from '@/utils/utils'
import { onMounted, onUnmounted, ref } from 'vue'

import JournalPage from './JournalPage.vue'

const store = useJournalStore()

const pageNumber = ref<number>(1)
const pageText = ref<string>('')
const pageDate = ref<string>(formattedCurrentDate())

onMounted(() => {
  const latestPage = store.getLatestPage()
  window.addEventListener('keyup', goToPreviousPage)
  window.addEventListener('keydown', goToNextPage)

  pageNumber.value = latestPage.pageNumber
  pageText.value = latestPage.text
  pageDate.value = latestPage.date
})

onUnmounted(() => {
  window.removeEventListener('keyup', goToPreviousPage)
  window.removeEventListener('keydown', goToNextPage)
})

const goToPreviousPage = (e: KeyboardEvent) => {
  if (e.key !== 'ArrowUp') {
    return
  }
  const currentPage = store.getPageByPageNumber(pageNumber.value - 1)
  if (currentPage) {
    pageNumber.value = currentPage.pageNumber
    pageText.value = currentPage.text
    pageDate.value = currentPage.date
  }
}

const goToNextPage = (e: KeyboardEvent) => {
  if (e.key !== 'ArrowDown') {
    return
  }
  const currentPage = store.getPageByPageNumber(pageNumber.value + 1)
  if (currentPage) {
    pageNumber.value = currentPage.pageNumber
    pageText.value = currentPage.text
    pageDate.value = currentPage.date
  }
}

const onTextChange = (text: string) => {
  store.addPage({
    pageNumber: pageNumber.value,
    text,
    date: pageDate.value
  })
}

const onPageOverFlow = (remnantText: string, text: string) => {
  store.addPage({
    pageNumber: pageNumber.value,
    text,
    date: pageDate.value
  })
  store.addPage({
    pageNumber: pageNumber.value + 1,
    text: remnantText,
    date: pageDate.value
  })
  pageNumber.value = store.latestPageNumber
  pageText.value = remnantText
}
</script>

<template>
  <div class="container">
    <JournalPage
      @page-overflow="onPageOverFlow"
      @on-text-change="onTextChange"
      :pageNumber="pageNumber"
      :pageText="pageText"
      :pageDate="pageDate"
    />
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e4dede;
}
</style>
