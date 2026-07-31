<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useCategoriesStore } from '@/stores/categories'

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
  <q-layout view="lHh Lpr lFf">
    <!-- Topbar -->
    <q-header elevated class="bg-white text-gray-800 shadow-sm">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="text-gray-700"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="flex items-center gap-2 max-w-[220px]">
          <span class="text-xl font-bold text-blue-600">GIPHY Explorer</span>
        </q-toolbar-title>

        <q-input
          v-if="showSearch"
          v-model="searchInput"
          dense
          outlined
          clearable
          placeholder="Buscar GIFs..."
          class="flex-1 max-w-md"
          bg-color="grey-2"
          @clear="searchStore.clear()"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div v-else class="flex-1" />

        <div class="text-sm text-gray-500 ml-4">
          Desenvolvido por <span class="font-semibold">Victória</span>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Navbar lateral -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-gray-50"
    >
      <q-list padding>
        <q-item
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          clickable
          v-ripple
          exact
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            {{ item.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Conteúdo da página ativa -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
