<script setup>
import { onMounted, ref } from 'vue'
import { useGifsStore } from '@/stores/gifs'
import GifCard from '@/components/gif/GifCard.vue'
import GifDetailsModal from '@/components/gif/GifDetailsModal.vue'

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
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">GIFs em alta</h1>

    <div v-if="gifsStore.loading" class="text-gray-500">Carregando...</div>
    <div v-else-if="gifsStore.error" class="text-red-500">{{
      gifsStore.error
    }}</div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <GifCard
        v-for="gif in gifsStore.gifsToDisplay"
        :key="gif.id"
        :gif="gif"
        @open-details="openDetails"
      />
    </div>

    <GifDetailsModal v-model="showModal" :gif="selectedGif" />
  </q-page>
</template>
