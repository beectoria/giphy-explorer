import { defineStore } from 'pinia'
import {
  fetchCategories,
  fetchGifsByCategory
} from '@/services/giphy/giphyCategories'

const PAGE_SIZE = 24

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    list: [],
    activeCategoryGifs: [],
    activeCategoryName: '',
    currentPage: 1,
    totalCount: 0,
    loading: false,
    error: null
  }),
  getters: {
    totalPages: state => Math.max(1, Math.ceil(state.totalCount / PAGE_SIZE))
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
    async loadGifsByCategory(name, { page = 1, searchTerm = '' } = {}) {
      this.activeCategoryName = name
      this.currentPage = page
      this.loading = true
      this.error = null
      const query = searchTerm ? `${name} ${searchTerm}` : name
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
    }
  }
})
