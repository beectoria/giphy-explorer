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
  <div class="rounded-lg overflow-hidden shadow-md relative group bg-white">
    <img
      :src="gif.images.fixed_height.url"
      :alt="gif.title"
      class="w-full object-cover cursor-pointer"
      @click="emit('open-details', gif)"
    />
    <q-btn
      round
      dense
      :color="favoritesStore.isFavorite(gif.id) ? 'red' : 'grey-6'"
      :icon="favoritesStore.isFavorite(gif.id) ? 'favorite' : 'favorite_border'"
      class="absolute top-2 right-2 bg-white"
      @click.stop="toggleFavorite"
    />
  </div>
</template>
