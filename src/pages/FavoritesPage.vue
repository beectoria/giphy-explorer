<script setup>
import { computed, ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useSearchStore } from '@/stores/search'
import GifCard from '@/components/gif/GifCard.vue'
import GifDetailsModal from '@/components/gif/GifDetailsModal.vue'

const favoritesStore = useFavoritesStore()
const searchStore = useSearchStore()

const showModal = ref(false)
const selectedGif = ref(null)

const filteredFavorites = computed(() => {
  const term = searchStore.term.toLowerCase()
  if (!term) return favoritesStore.favorites
  return favoritesStore.favorites.filter(gif =>
    gif.title?.toLowerCase().includes(term)
  )
})

function openDetails(gif) {
  selectedGif.value = gif
  showModal.value = true
}
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Meus Favoritos</h1>

    <div v-if="favoritesStore.count === 0" class="text-gray-500">
      Você ainda não favoritou nenhum GIF.
    </div>

    <div v-else-if="filteredFavorites.length === 0" class="text-gray-500">
      Nenhum favorito encontrado para "{{ searchStore.term }}".
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <GifCard
        v-for="gif in filteredFavorites"
        :key="gif.id"
        :gif="gif"
        @open-details="openDetails"
      />
    </div>

    <GifDetailsModal v-model="showModal" :gif="selectedGif" />
  </q-page>
</template>
