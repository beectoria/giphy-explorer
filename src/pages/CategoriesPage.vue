<script setup>
import { onMounted, ref, watch } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { useSearchStore } from '@/stores/search'
import CategoryCard from '@/components/category/CategoryCard.vue'
import GifCard from '@/components/gif/GifCard.vue'
import GifDetailsModal from '@/components/gif/GifDetailsModal.vue'
import PaginationControls from '@/components/common/PaginationControls.vue'

const categoriesStore = useCategoriesStore()
const searchStore = useSearchStore()

const showModal = ref(false)
const selectedGif = ref(null)

onMounted(() => {
  categoriesStore.loadCategories()
})

function changePage(page) {
  categoriesStore.selectCategory(categoriesStore.activeCategory, {
    page,
    searchTerm: searchStore.term
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function openDetails(gif) {
  selectedGif.value = gif
  showModal.value = true
}

watch(
  () => searchStore.term,
  term => {
    if (!categoriesStore.hasSelection) return
    categoriesStore.selectCategory(categoriesStore.activeCategory, {
      page: 1,
      searchTerm: term
    })
  }
)
</script>

<template>
  <q-page>
    <section class="max-w-7xl mx-auto">
      <!-- Categoria selecionada -->
      <div v-if="categoriesStore.hasSelection">
        <div class="flex items-center gap-3 mb-8">
          <q-btn
            flat
            dense
            round
            icon="arrow_back"
            @click="categoriesStore.clearSelection()"
          />

          <h1 class="text-4xl md:text-5xl font-light text-slate-800">
            {{ categoriesStore.activeCategory.name }}

            <span
              v-if="searchStore.term"
              class="text-lg font-normal text-slate-500"
            >
              + "{{ searchStore.term }}"
            </span>
          </h1>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div
            v-if="categoriesStore.loading"
            class="text-center py-16 text-slate-500"
          >
            Carregando...
          </div>

          <div
            v-else-if="categoriesStore.error"
            class="text-center py-16 text-red-500"
          >
            {{ categoriesStore.error }}
          </div>

          <div
            v-else-if="categoriesStore.activeCategoryGifs.length === 0"
            class="text-center py-16 text-slate-500"
          >
            Nenhum GIF encontrado para essa busca.
          </div>

          <template v-else>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <GifCard
                v-for="gif in categoriesStore.activeCategoryGifs"
                :key="gif.id"
                :gif="gif"
                @open-details="openDetails"
              />
            </div>

            <div class="mt-10 flex justify-center">
              <PaginationControls
                :current-page="categoriesStore.currentPage"
                :total-pages="categoriesStore.totalPages"
                @change-page="changePage"
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Lista de categorias -->
      <div v-else>
        <h1 class="text-4xl md:text-5xl font-light text-slate-800 mb-8">
          Categorias
        </h1>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div
            v-if="categoriesStore.loading"
            class="text-center py-16 text-slate-500"
          >
            Carregando...
          </div>

          <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard
              v-for="cat in categoriesStore.list"
              :key="cat.name"
              :category="cat"
              @select="
                categoriesStore.selectCategory(cat, {
                  searchTerm: searchStore.term
                })
              "
            />
          </div>
        </div>
      </div>

      <GifDetailsModal v-model="showModal" :gif="selectedGif" />
    </section>
  </q-page>
</template>
