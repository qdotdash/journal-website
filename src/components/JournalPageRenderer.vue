<script setup lang="ts">
import type { Page } from '@/stores/store'
import { formattedCurrentDate } from '@/utils/utils'
import { onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import JournalPage from './JournalPage.vue'

const store = useStore()

const pageNumber = ref<number>(1)
const pageText = ref<string>('')
const pageDate = ref<string>(formattedCurrentDate())

onMounted(() => {
  const latestPage = store.getters.getLatestPage
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

// onUnmounted(() => {
//   addPage({
//     id: Math.random().toString(),
//     pageNumber: pageNumber.value,
//     text: pageText.value,
//     pageDate: pageDate.value
//   })
// })

const addPage = (page: Page) => {
  store.dispatch('addPage', page)
}

const goToPreviousPage = (e: KeyboardEvent) => {
  if (pageNumber.value === 1 || e.key !== 'ArrowUp') {
    return
  }
  console.log(pageNumber.value, store.state.pages)
  const currentPage = store.state.pages[pageNumber.value - 2]
  pageNumber.value--
  pageText.value = currentPage.text
  pageDate.value = currentPage.date
}

const goToNextPage = (e: KeyboardEvent) => {
  if (pageNumber.value > store.state.pageNumber || e.key !== 'ArrowDown') {
    return
  }
  let currentPage = undefined
  // remove this code once handling is done
  if (pageNumber.value === store.state.pageNumber) {
    currentPage = { pageNumber: pageNumber.value + 1, text: '', date: '01 Jan, 0000' }
  } else {
    currentPage = store.state.pages[pageNumber.value + 1]
  }
  //////////////////////////////////////////
  if (currentPage) {
    pageNumber.value++
    pageText.value = currentPage.text
    pageDate.value = currentPage.date
  }
}

const onPageOverFlow = (remnantText: string, text: string) => {
  addPage({
    pageNumber: pageNumber.value,
    text,
    date: pageDate.value
  })
  console.log(store.state.pages)

  pageNumber.value++
  pageText.value = remnantText
}
</script>

<template>
  <div class="container">
    <JournalPage
      @page-overflow="onPageOverFlow"
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
