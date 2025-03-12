<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import { useBlogpostStore } from '@/stores/blogpost'

const blogpostStore = useBlogpostStore()

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} · Blogging Platform` : 'Blogging Platform';
  }
})

onMounted(() => {
  blogpostStore.fetchPosts()
})
</script>