<script setup>
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps({
  gif: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open-details'])

const favoritesStore = useFavoritesStore()

function toggleFavorite() {
  favoritesStore.toggleFavorite(props.gif)
}
</script>

<template>
  <div
    class="relative group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
  >
    <img
      :src="gif.images.fixed_height.url"
      :alt="gif.title"
      class="w-full h-52 object-cover"
      @click="emit('open-details', gif)"
    />

    <q-btn
      round
      dense
      :color="favoritesStore.isFavorite(gif.id) ? 'red' : 'grey-6'"
      :icon="favoritesStore.isFavorite(gif.id) ? 'favorite' : 'favorite_border'"
      class="absolute top-3 right-3 bg-white/90 shadow-sm"
      @click.stop="toggleFavorite"
    />

    <div class="p-3">
      <p class="truncate text-sm font-medium text-slate-700">
        {{ gif.title || 'Sem título' }}
      </p>
    </div>
  </div>
</template>
