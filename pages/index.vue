<template>
  <div>
    <h1 class="text-3xl font-bold my-4 sm:my-8">Latest Blog Posts</h1>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
      <BlogPostCard v-for="post in blogpostStore.posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
const blogpostStore = useBlogpostStore()
</script>