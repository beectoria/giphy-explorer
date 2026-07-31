import { defineStore } from 'pinia'
import { fetchCategories, fetchGifsByCategory } from 'src/services/giphy/giphyCategories'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    list: [],
    activeCategoryGifs: [],
    loading: false,
    error: null
  }),

  actions: {
    async loadCategories() {
      this.loading = true
      this.error = null
      try {
        const { data } = await fetchCategories()
        this.list = data
      } catch (e) {
        this.error = 'Não foi possível carregar as categorias.'
      } finally {
        this.loading = false
      }
    },

    async loadGifsByCategory(name) {
      this.loading = true
      this.error = null
      try {
        const { data } = await fetchGifsByCategory(name)
        this.activeCategoryGifs = data
      } catch (e) {
        this.error = 'Não foi possível carregar os GIFs dessa categoria.'
      } finally {
        this.loading = false
      }
    }
  }
})