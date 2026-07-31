<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

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
          flat dense round
          icon="menu"
          class="text-gray-700"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="flex items-center gap-2">
          <span class="text-xl font-bold text-purple-600">GIPHY Explorer</span>
        </q-toolbar-title>
        <div class="text-sm text-gray-500">
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