<script setup>
import { onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'

const categoriesStore = useCategoriesStore()

onMounted(() => {
  categoriesStore.loadCategories()
})
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Categorias</h1>

    <div v-if="categoriesStore.loading" class="text-gray-500"
      >Carregando...</div
    >
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="cat in categoriesStore.list"
        :key="cat.name"
        class="rounded-lg overflow-hidden shadow-md relative cursor-pointer"
      >
        <img
          :src="cat.gif.images.fixed_height.url"
          :alt="cat.name"
          class="w-full object-cover"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2"
        >
          {{ cat.name }}
        </div>
      </div>
    </div>
  </q-page>
</template>
