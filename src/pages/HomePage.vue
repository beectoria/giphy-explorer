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

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <q-page>
    <section class="max-w-7xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-light text-slate-800 mb-8">
        {{
          searchStore.term
            ? `Resultados para "${searchStore.term}"`
            : 'GIFs em alta'
        }}
      </h1>

      <div v-if="gifsStore.loading" class="text-center py-16 text-slate-500">
        Carregando...
      </div>

      <div v-else-if="gifsStore.error" class="text-center py-16 text-red-500">
        {{ gifsStore.error }}
      </div>

      <div
        v-else-if="gifsStore.gifsToDisplay.length === 0"
        class="text-center py-16 text-slate-500"
      >
      </div>

      <template v-else>
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <GifCard
              v-for="gif in gifsStore.gifsToDisplay"
              :key="gif.id"
              :gif="gif"
              @open-details="openDetails"
            />
          </div>

          <div class="mt-10 flex justify-center">
            <PaginationControls
              :current-page="gifsStore.currentPage"
              :total-pages="gifsStore.totalPages"
              @change-page="changePage"
            />
          </div>
        </div>
      </template>

      <GifDetailsModal v-model="showModal" :gif="selectedGif" />
    </section>
  </q-page>
</template>
