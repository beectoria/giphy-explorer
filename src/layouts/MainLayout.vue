<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useCategoriesStore } from '@/stores/categories'
import AppTopbar from '@/components/layout/AppTopbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const route = useRoute()
const leftDrawerOpen = ref(true)
const searchInput = ref('')
const searchStore = useSearchStore()
const categoriesStore = useCategoriesStore()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const showSearch = computed(() => {
  if (route.name === 'about') return false
  if (route.name === 'categories') return categoriesStore.hasSelection
  return true
})

let debounceTimer = null
watch(searchInput, value => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    searchStore.setTerm(value.trim())
  }, 200)
})

const menuItems = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Favoritos', icon: 'favorite', to: '/favoritos' },
  { label: 'Categorias', icon: 'category', to: '/categorias' },
  { label: 'Sobre', icon: 'info', to: '/sobre' }
]
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <AppTopbar
      v-model:search-term="searchInput"
      :show-search="showSearch"
      @toggle-drawer="toggleLeftDrawer"
      @clear-search="searchStore.clear()"
    />

    <AppSidebar v-model="leftDrawerOpen" :menu-items="menuItems" />

    <q-page-container class="bg-[#f4f6fb]">
      <div class="p-6 md:p-8">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>
