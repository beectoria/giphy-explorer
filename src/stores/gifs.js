import { defineStore } from 'pinia'
import { fetchTrendingGifs, searchGifs } from '@/services/giphy/giphyGifs'

const PAGE_SIZE = 24

export const useGifsStore = defineStore('gifs', {
  state: () => ({
    trending: [],
    searchResults: [],
    searchTerm: '',
    loading: false,
    error: null,
    currentPage: 1,
    totalCount: 0
  }),
  getters: {
    gifsToDisplay: state =>
      state.searchTerm ? state.searchResults : state.trending,
    totalPages: state => Math.max(1, Math.ceil(state.totalCount / PAGE_SIZE))
  },
  actions: {
    async loadTrending(page = 1) {
      this.loading = true
      this.error = null
      this.currentPage = page
      try {
        const { data, pagination } = await fetchTrendingGifs({
          limit: PAGE_SIZE,
          offset: (page - 1) * PAGE_SIZE
        })
        this.trending = data
        this.totalCount = pagination.total_count
      } catch (e) {
        console.error(e)
        this.error = 'Não foi possível carregar os GIFs em alta.'
      } finally {
        this.loading = false
      }
    },
    async search(term, page = 1) {
      this.searchTerm = term
      this.currentPage = page
      if (!term) {
        this.searchResults = []
        this.totalCount = 0
        return
      }
      this.loading = true
      this.error = null
      try {
        const { data, pagination } = await searchGifs(term, {
          limit: PAGE_SIZE,
          offset: (page - 1) * PAGE_SIZE
        })
        this.searchResults = data
        this.totalCount = pagination.total_count
      } catch (e) {
        console.error(e)
        this.error = 'Erro ao buscar GIFs.'
      } finally {
        this.loading = false
      }
    }
  }
})
