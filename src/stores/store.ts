import { formattedCurrentDate, generatePageId } from '@/utils/utils'
import { createStore } from 'vuex'

interface _Page {
  id: string
  pageNumber: number
  text: string
  date: string
}

export type Page = Omit<_Page, 'id'>

interface State {
  pages: _Page[]
  pageNumber: number
}

const getDefaultPage = (): _Page => {
  return {
    id: generatePageId().toString(),
    pageNumber: 1,
    text: '',
    date: formattedCurrentDate()
  }
}

const store = createStore<State>({
  state() {
    return {
      pages: [],
      pageNumber: 0
    }
  },
  mutations: {
    addPage(state, page: Page) {
      if (state.pageNumber + 1 === page.pageNumber) {
        state.pages.push({ ...page, id: generatePageId().toString() })
        state.pageNumber++
      } else if (state.pageNumber >= page.pageNumber) {
        const targetPageNumber = page.pageNumber
        const index = state.pages.findIndex((_page) => _page.pageNumber === targetPageNumber)
        if (index >= 0) {
          state.pages[index].text = page.text
        }
      }
    }
  },
  actions: {
    addPage(context, page) {
      context.commit('addPage', page)
    }
  },
  getters: {
    getPageByPageNumber:
      (state) =>
      (pageNumber: number): Page | undefined => {
        return state.pages.find((page) => page.pageNumber === pageNumber)
      },
    getLatestPage: (state) => {
      const [lastPage] = state.pages.slice(-1)
      if (lastPage) {
        return lastPage
      }
      const defaultPage = getDefaultPage()
      return defaultPage
    }
  }
})

export default store
