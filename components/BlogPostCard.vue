<template>
  <NuxtLink :to="`/blogposts/${post.id}`">
    <div class="p-4 mb-4 border border-gray-300 rounded">
      <div class="img-wrapper w-full aspect-[3/2] bg-gray-100 rounded overflow-hidden">
        <img src="/images/img_placeholder.png" alt="">
      </div>
      <div class="mt-4">
        <h3 class="text-lg font-semibold">{{ post.title }}</h3>
        <p class="text-gray-600 line-clamp-3">{{ post.content }}</p>
        <span class="inline-block text-sm text-gray-400 mt-2">By {{ post.author }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  post: Object
})
</script>