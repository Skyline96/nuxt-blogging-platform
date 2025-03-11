<template>
  <div>
    <h1 class="text-3xl font-bold my-4 sm:my-8">My Blog Posts</h1>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
      <BlogPostCard v-for="post in userBlogposts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
const { data: userBlogposts } = await useFetch(`/api/blogposts/user`)
</script>