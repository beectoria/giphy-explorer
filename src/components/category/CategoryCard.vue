<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])
</script>

<template>
  <div
    class="rounded-lg overflow-hidden shadow-md relative cursor-pointer group"
    @click="emit('select', category)"
  >
    <img
      :src="category.gif.images.fixed_height.url"
      :alt="category.name"
      class="w-full object-cover transition-transform group-hover:scale-105"
    />
    <div
      class="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2 font-medium"
    >
      {{ category.name }}
    </div>
  </div>
</template>
