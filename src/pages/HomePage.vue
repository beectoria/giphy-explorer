<script setup>
import { onMounted, ref } from 'vue'
import { useGifsStore } from '@/stores/gifs'
import GifCard from '@/components/gif/GifCard.vue'
import GifDetailsModal from '@/components/gif/GifDetailsModal.vue'
import PaginationControls from '@/components/common/PaginationControls.vue'

const gifsStore = useGifsStore()

const showModal = ref(false)
const selectedGif = ref(null)

onMounted(() => {
  gifsStore.loadTrending()
})

function openDetails(gif) {
  selectedGif.value = gif
  showModal.value = true
}

function changePage(page) {
  gifsStore.loadTrending(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">GIFs em alta</h1>

    <div v-if="gifsStore.loading" class="text-gray-500">Carregando...</div>
    <div v-else-if="gifsStore.error" class="text-red-500">{{
      gifsStore.error
    }}</div>

    <template v-else>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GifCard
          v-for="gif in gifsStore.gifsToDisplay"
          :key="gif.id"
          :gif="gif"
          @open-details="openDetails"
        />
      </div>

      <PaginationControls
        :current-page="gifsStore.currentPage"
        :total-pages="gifsStore.totalPages"
        @change-page="changePage"
      />
    </template>

    <GifDetailsModal v-model="showModal" :gif="selectedGif" />
  </q-page>
</template>
