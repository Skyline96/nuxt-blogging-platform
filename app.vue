<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import { useBlogpostStore } from '@/stores/blogpost'

const blogpostStore = useBlogpostStore()

onMounted(() => {
  blogpostStore.fetchPosts()
})
</script>