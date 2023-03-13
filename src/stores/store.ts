import { generatePageId } from '@/utils/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface _Page {
  id: string
  pageNumber: number
  text: string
  date: string
}

export type Page = Omit<_Page, 'id'>

export const useJournalStore = defineStore('journal-page', () => {
  const pages = ref<_Page[]>([])
  const latestPageNumber = ref<number>(0)

  const addPage = (page: Page) => {
    console.log('Adding page')
    const targetPage = pages.value[page.pageNumber]
    targetPage.id = generatePageId().toString()
    targetPage.pageNumber = page.pageNumber
    targetPage.date = page.date
    targetPage.text = page.text
  }

  const getPageByPageNumber = (pageNumber: number): Page | undefined => {
    if (pageNumber < 1 || pageNumber > latestPageNumber.value) {
      return undefined
    }
    return pages.value.find((page) => page.pageNumber === pageNumber)
  }

  const getLatestPage = (): Page => {
    return pages.value[latestPageNumber.value]
  }

  return {
    addPage,
    getPageByPageNumber,
    getLatestPage,
    latestPageNumber: latestPageNumber.value
  }
})
