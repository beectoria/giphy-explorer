<script setup>
import { onMounted, ref } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import CategoryCard from '@/components/category/CategoryCard.vue'
import GifCard from '@/components/gif/GifCard.vue'
import GifDetailsModal from '@/components/gif/GifDetailsModal.vue'
import PaginationControls from '@/components/common/PaginationControls.vue'

const categoriesStore = useCategoriesStore()

const selectedCategory = ref(null)
const showModal = ref(false)
const selectedGif = ref(null)

onMounted(() => {
  categoriesStore.loadCategories()
})

function selectCategory(category) {
  selectedCategory.value = category
  categoriesStore.loadGifsByCategory(category.name)
}

function backToCategories() {
  selectedCategory.value = null
}

function changePage(page) {
  categoriesStore.loadGifsByCategory(categoriesStore.activeCategoryName, page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function openDetails(gif) {
  selectedGif.value = gif
  showModal.value = true
}
</script>

<template>
  <q-page class="q-pa-md">
    <!-- Modo: grid de GIFs de uma categoria selecionada -->
    <div v-if="selectedCategory">
      <div class="flex items-center gap-2 mb-4">
        <q-btn flat dense round icon="arrow_back" @click="backToCategories" />
        <h1 class="text-2xl font-bold text-gray-800">
          {{ selectedCategory.name }}
        </h1>
      </div>

      <div v-if="categoriesStore.loading" class="text-gray-500"
        >Carregando...</div
      >
      <div v-else-if="categoriesStore.error" class="text-red-500">
        {{ categoriesStore.error }}
      </div>
      <template v-else>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GifCard
            v-for="gif in categoriesStore.activeCategoryGifs"
            :key="gif.id"
            :gif="gif"
            @open-details="openDetails"
          />
        </div>

        <PaginationControls
          :current-page="categoriesStore.currentPage"
          :total-pages="categoriesStore.totalPages"
          @change-page="changePage"
        />
      </template>
    </div>

    <!-- Modo: lista de categorias -->
    <div v-else>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Categorias</h1>

      <div v-if="categoriesStore.loading" class="text-gray-500"
        >Carregando...</div
      >
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CategoryCard
          v-for="cat in categoriesStore.list"
          :key="cat.name"
          :category="cat"
          @select="selectCategory"
        />
      </div>
    </div>

    <GifDetailsModal v-model="showModal" :gif="selectedGif" />
  </q-page>
</template>
