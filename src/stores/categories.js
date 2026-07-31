import { defineStore } from 'pinia'
import {
  fetchCategories,
  fetchGifsByCategory
} from '@/services/giphy/giphyCategories'
import { PAGE_SIZE } from '@/utils/constants'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    list: [],
    activeCategoryGifs: [],
    activeCategory: null,
    currentPage: 1,
    totalCount: 0,
    loading: false,
    error: null
  }),
  getters: {
    totalPages: state => Math.max(1, Math.ceil(state.totalCount / PAGE_SIZE)),
    hasSelection: state => state.activeCategory !== null
  },
  actions: {
    async loadCategories() {
      this.loading = true
      this.error = null
      try {
        const { data } = await fetchCategories()
        this.list = data
      } catch (e) {
        console.error(e)
        this.error = 'Não foi possível carregar as categorias.'
      } finally {
        this.loading = false
      }
    },
    async selectCategory(category, { page = 1, searchTerm = '' } = {}) {
      this.activeCategory = category
      this.currentPage = page
      this.loading = true
      this.error = null
      const query = searchTerm
        ? `${category.name} ${searchTerm}`
        : category.name
      try {
        const { data, pagination } = await fetchGifsByCategory(query, {
          limit: PAGE_SIZE,
          offset: (page - 1) * PAGE_SIZE
        })
        this.activeCategoryGifs = data
        this.totalCount = pagination.total_count
      } catch (e) {
        console.error(e)
        this.error = 'Não foi possível carregar os GIFs dessa categoria.'
      } finally {
        this.loading = false
      }
    },
    clearSelection() {
      this.activeCategory = null
      this.activeCategoryGifs = []
    }
  }
})
