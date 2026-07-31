<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change-page'])

function goTo(page) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return
  emit('change-page', page)
}

function visiblePages() {
  const total = props.totalPages
  const current = props.currentPage
  const delta = 2
  const pages = []

  for (let p = 1; p <= total; p++) {
    if (
      p === 1 ||
      p === total ||
      (p >= current - delta && p <= current + delta)
    ) {
      pages.push(p)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return pages
}
</script>

<template>
  <div class="flex items-center justify-center gap-1 flex-wrap mt-6">
    <q-btn
      flat
      dense
      round
      icon="chevron_left"
      :disable="currentPage === 1"
      @click="goTo(currentPage - 1)"
    />

    <template v-for="(page, index) in visiblePages()" :key="index">
      <span v-if="page === '...'" class="px-2 text-gray-400">...</span>
      <q-btn
        v-else
        dense
        :flat="page !== currentPage"
        :color="page === currentPage ? 'blue-7' : 'grey-8'"
        class="min-w-[2.25rem]"
        @click="goTo(page)"
      >
        {{ page }}
      </q-btn>
    </template>

    <q-btn
      flat
      dense
      round
      icon="chevron_right"
      :disable="currentPage === totalPages"
      @click="goTo(currentPage + 1)"
    />
  </div>
</template>
