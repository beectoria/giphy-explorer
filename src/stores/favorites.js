import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

const STORAGE_KEY = 'sgbr_favorite_gifs'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: LocalStorage.getItem(STORAGE_KEY) || []
  }),

  getters: {
    isFavorite: (state) => (gifId) => state.favorites.some(g => g.id === gifId),
    count: (state) => state.favorites.length
  },

  actions: {
    toggleFavorite(gif) {
      const exists = this.favorites.find(g => g.id === gif.id)
      this.favorites = exists
        ? this.favorites.filter(g => g.id !== gif.id)
        : [...this.favorites, gif]
      this._persist()
    },

    removeFavorite(gifId) {
      this.favorites = this.favorites.filter(g => g.id !== gifId)
      this._persist()
    },

    _persist() {
      LocalStorage.set(STORAGE_KEY, this.favorites)
    }
  }
})