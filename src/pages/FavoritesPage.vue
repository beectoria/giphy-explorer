<script setup>
import { ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import GifCard from '@/components/gif/GifCard.vue'
import GifDetailsModal from '@/components/gif/GifDetailsModal.vue'

const favoritesStore = useFavoritesStore()

const showModal = ref(false)
const selectedGif = ref(null)

function openDetails(gif) {
  selectedGif.value = gif
  showModal.value = true
}
</script>

<template>
  <q-page>
    <section class="max-w-7xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-light text-slate-800 mb-8">
        Meus Favoritos
      </h1>

      <div class="bg-white rounded-xl shadow-sm p-6">
        <div
          v-if="favoritesStore.count === 0"
          class="text-center py-16 text-slate-500"
        >
          Você ainda não favoritou nenhum GIF.
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <GifCard
            v-for="gif in favoritesStore.favorites"
            :key="gif.id"
            :gif="gif"
            @open-details="openDetails"
          />
        </div>
      </div>

      <GifDetailsModal v-model="showModal" :gif="selectedGif" />
    </section>
  </q-page>
</template>
