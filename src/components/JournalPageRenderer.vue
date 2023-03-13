<script setup lang="ts">
import { useJournalStore } from '@/stores/store'
import { formattedCurrentDate } from '@/utils/utils'
import { onMounted, onUnmounted, ref } from 'vue'
import JournalPage from './JournalPage.vue'

const { addPage, getPageByPageNumber, getLatestPage } = useJournalStore()

const pageNumber = ref<number>(1)
const pageText = ref<string>('')
const pageDate = ref<string>(formattedCurrentDate())

onMounted(() => {
  const latestPage = getLatestPage()
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
  const currentPage = getPageByPageNumber(pageNumber.value - 1)
  if (currentPage) {
    pageNumber.value--
    pageText.value = currentPage.text
    pageDate.value = currentPage.date
  }
}

const goToNextPage = (e: KeyboardEvent) => {
  if (e.key !== 'ArrowDown') {
    return
  }
  const currentPage = getPageByPageNumber(pageNumber.value + 1)
  if (currentPage) {
    pageNumber.value++
    pageText.value = currentPage.text
    pageDate.value = currentPage.date
  }
}

const onTextChange = (text: string) => {
  addPage({
    pageNumber: pageNumber.value,
    text,
    date: pageDate.value
  })
}

const onPageOverFlow = (remnantText: string, text: string) => {
  console.log("Calling add page")
  addPage({
    pageNumber: pageNumber.value,
    text,
    date: pageDate.value
  })

  pageNumber.value++
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
