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
    <q-list padding class="q-gutter-y-xs">
      <q-item
        v-for="item in menuItems"
        :key="item.label"
        :to="item.to"
        clickable
        v-ripple
        exact
        active-class="!bg-[#1e5edb] !text-white"
        class="!text-slate-300 rounded-md q-px-md q-py-sm transition-colors hover:!bg-slate-800/60"
      >
        <q-item-section avatar class="min-w-0 pr-3">
          <q-icon :name="item.icon" size="22px" />
        </q-item-section>
        <q-item-section class="text-[15px] font-medium">
          {{ item.label }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
