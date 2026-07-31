<script setup>
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Meus Favoritos</h1>

    <div v-if="favoritesStore.count === 0" class="text-gray-500">
      Você ainda não favoritou nenhum GIF.
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="gif in favoritesStore.favorites"
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
