<script setup>
import { onMounted, ref, watch } from 'vue'
import { useGifsStore } from '@/stores/gifs'
import { useSearchStore } from '@/stores/search'
import GifCard from '@/components/gif/GifCard.vue'
import GifDetailsModal from '@/components/gif/GifDetailsModal.vue'
import PaginationControls from '@/components/common/PaginationControls.vue'

const gifsStore = useGifsStore()
const searchStore = useSearchStore()

const showModal = ref(false)
const selectedGif = ref(null)

onMounted(() => {
  if (searchStore.term) {
    gifsStore.search(searchStore.term)
  } else {
    gifsStore.loadTrending()
  }
})

watch(
  () => searchStore.term,
  term => {
    if (term) {
      gifsStore.search(term)
    } else {
      gifsStore.loadTrending()
    }
  }
)

function openDetails(gif) {
  selectedGif.value = gif
  showModal.value = true
}

function changePage(page) {
  if (searchStore.term) {
    gifsStore.search(searchStore.term, page)
  } else {
    gifsStore.loadTrending(page)
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">
      {{
        searchStore.term
          ? `Resultados para "${searchStore.term}"`
          : 'GIFs em alta'
      }}
    </h1>

    <div v-if="gifsStore.loading" class="text-gray-500">Carregando...</div>
    <div v-else-if="gifsStore.error" class="text-red-500">{{
      gifsStore.error
    }}</div>
    <div v-else-if="gifsStore.gifsToDisplay.length === 0" class="text-gray-500">
      Nenhum GIF encontrado para essa busca.
    </div>

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
