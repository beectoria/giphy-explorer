import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    term: ''
  }),
  actions: {
    setTerm(term) {
      this.term = term
    },
    clear() {
      this.term = ''
    }
  }
})
