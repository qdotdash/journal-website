import { formattedCurrentDate, generatePageId } from '@/utils/utils'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

interface _Page {
  id: string
  pageNumber: number
  text: string
  date: string
}

export type Page = Omit<_Page, 'id'>

const getDefaultPage = (): _Page => {
  return {
    id: generatePageId().toString(),
    pageNumber: 1,
    text: '',
    date: formattedCurrentDate()
  }
}

export const useJournalStore = defineStore('journal-page', () => {
  const defaultPagesValue = localStorage.getItem('pages')
    ? JSON.parse(localStorage.getItem('pages') as string)
    : []
  const pages = ref<_Page[]>(defaultPagesValue)
  const latestPageNumber = computed(() => pages.value.length)

  watch(
    pages,
    (pages) => {
      localStorage.setItem('pages', JSON.stringify(pages))
    },
    { deep: true }
  )

  const addPage = (page: Page) => {
    const newPage: _Page = {
      id: generatePageId().toString(),
      pageNumber: page.pageNumber,
      date: page.date,
      text: page.text
    }
    if (page.pageNumber > latestPageNumber.value) {
      pages.value.push(newPage)
    } else {
      pages.value[page.pageNumber - 1] = newPage
    }
    console.log('Adding page', { pages: pages.value, latestPageNumber: latestPageNumber.value })
  }

  const getPageByPageNumber = (pageNumber: number): Page | undefined => {
    if (pageNumber < 1 || pageNumber > latestPageNumber.value) {
      return undefined
    }
    return pages.value.find((page) => page.pageNumber === pageNumber)
  }

  const getLatestPage = (): Page => {
    return pages.value[latestPageNumber.value - 1] || getDefaultPage()
  }

  return {
    addPage,
    getPageByPageNumber,
    getLatestPage,
    latestPageNumber
  }
})
