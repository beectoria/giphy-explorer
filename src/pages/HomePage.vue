<script setup>
import { onMounted } from 'vue'
import { useGifsStore } from '@/stores/gifs'

const gifsStore = useGifsStore()

onMounted(() => {
  gifsStore.loadTrending()
})
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">GIFs em alta</h1>

    <div v-if="gifsStore.loading" class="text-gray-500">Carregando...</div>
    <div v-else-if="gifsStore.error" class="text-red-500">{{
      gifsStore.error
    }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="gif in gifsStore.gifsToDisplay"
        :key="gif.id"
        class="rounded-lg overflow-hidden shadow-md"
      >
        <img
          :src="gif.images.fixed_height.url"
          :alt="gif.title"
          class="w-full object-cover"
        />
      </div>
    </div>
  </q-page>
</template>
