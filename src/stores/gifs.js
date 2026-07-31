import { defineStore } from 'pinia'
import { fetchTrendingGifs, searchGifs } from '@/services/giphy/giphyGifs'

export const useGifsStore = defineStore('gifs', {
  state: () => ({
    trending: [],
    searchResults: [],
    searchTerm: '',
    loading: false,
    error: null
  }),

  getters: {
    gifsToDisplay: state =>
      state.searchTerm ? state.searchResults : state.trending
  },

  actions: {
    async loadTrending() {
      this.loading = true
      this.error = null
      try {
        const { data } = await fetchTrendingGifs()
        this.trending = data
      } catch (e) {
        console.error(e)
        this.error = 'Não foi possível carregar os GIFs em alta.'
      } finally {
        this.loading = false
      }
    },

    async search(term) {
      this.searchTerm = term

      if (!term) {
        this.searchResults = []
        return
      }

      this.loading = true
      this.error = null
      try {
        const { data } = await searchGifs(term)
        this.searchResults = data
      } catch (e) {
        console.error(e)
        this.error = 'Erro ao buscar GIFs.'
      } finally {
        this.loading = false
      }
    }
  }
})
