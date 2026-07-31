<script setup>
defineProps({
  showSearch: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle-drawer', 'clear-search'])

const searchInput = defineModel('searchTerm', {
  type: String,
  default: ''
})
</script>

<template>
  <q-header elevated class="bg-[#1e5edb] text-white">
    <q-toolbar class="flex items-center gap-6 px-4 md:px-6 py-2">
      <div class="flex items-center gap-2 shrink-0">
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="text-white"
          @click="emit('toggle-drawer')"
        />

        <span class="text-xl font-bold whitespace-nowrap">
          GIPHY Explorer
        </span>
      </div>

      <div class="flex-1 flex justify-center px-4">
        <q-input
          v-if="showSearch"
          v-model="searchInput"
          dense
          outlined
          clearable
          bg-color="white"
          placeholder="Buscar GIFs..."
          class="w-full max-w-sm rounded"
          @clear="emit('clear-search')"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <span
          class="text-sm font-bold uppercase tracking-wide whitespace-nowrap"
        >
          Victória
        </span>

        <q-avatar size="40px" color="white" text-color="blue-9">
          <q-icon name="person" size="26px" />
        </q-avatar>
      </div>
    </q-toolbar>
  </q-header>
</template>
