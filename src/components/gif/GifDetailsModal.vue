<script setup>
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  gif: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const favoritesStore = useFavoritesStore()

function toggleFavorite() {
  if (props.gif) {
    favoritesStore.toggleFavorite(props.gif)
  }
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="close">
    <q-card v-if="gif" class="w-full max-w-lg">
      <q-img :src="gif.images.original.url" :alt="gif.title" fit="contain" />
      <q-card-section class="flex items-center justify-between">
        <div class="text-lg font-semibold text-gray-800">
          {{ gif.title || 'Sem título' }}
        </div>
        <q-btn
          round
          dense
          :color="favoritesStore.isFavorite(gif.id) ? 'red' : 'grey-6'"
          :icon="
            favoritesStore.isFavorite(gif.id) ? 'favorite' : 'favorite_border'
          "
          @click="toggleFavorite"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
