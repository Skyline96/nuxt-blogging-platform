<template>
  <div class="p-4 mb-4 border border-gray-300 rounded">
    <div class="img-wrapper w-full aspect-[3/2] bg-gray-100 rounded overflow-hidden">
      <img :src="post.img" alt="">
    </div>
    <div class="mt-4">
      <NuxtLink :to="`/blogs/${post.id}`" class="text-lg font-semibold">{{ post.title }}</NuxtLink>
      <p class="text-gray-600">{{ post.description }}</p>
      <span class="inline-block text-sm text-gray-400 mt-2">By {{ post.author }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  post: Object
})
</script>