<script setup>
defineProps({
  menuItems: {
    type: Array,
    required: true
  }
})

const modelValue = defineModel({ type: Boolean, default: true })
</script>

<template>
  <q-drawer v-model="modelValue" show-if-above bordered class="bg-[#0b1b3d]">
    <q-list padding>
      <q-item
        v-for="item in menuItems"
        :key="item.label"
        :to="item.to"
        clickable
        v-ripple
        exact
        active-class="bg-[#1e5edb] text-white rounded-md"
        class="text-gray-300 rounded-md q-mb-xs"
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
</template>
