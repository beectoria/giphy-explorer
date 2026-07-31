<script setup>
defineProps({
  showSearch: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle-drawer', 'clear-search'])

const searchInput = defineModel('searchTerm', { type: String, default: '' })
</script>

<template>
  <q-header elevated class="bg-[#1e5edb] text-white">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        class="text-white"
        @click="emit('toggle-drawer')"
      />
      <q-toolbar-title class="flex items-center gap-2 max-w-[220px]">
        <span class="text-xl font-bold text-white">GIPHY Explorer</span>
      </q-toolbar-title>

      <q-input
        v-if="showSearch"
        v-model="searchInput"
        dense
        outlined
        clearable
        placeholder="Buscar GIFs..."
        class="flex-1 max-w-md bg-white rounded"
        @clear="emit('clear-search')"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <div v-else class="flex-1" />

      <div class="flex items-center gap-2 text-sm ml-4">
        <span class="font-semibold">Victória</span>
        <q-avatar size="32px" color="white" text-color="blue-9">
          <q-icon name="person" />
        </q-avatar>
      </div>
    </q-toolbar>
  </q-header>
</template>
