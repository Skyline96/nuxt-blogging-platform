<template>
  <div v-if="currentPost" class=" my-8">
    <h1 class="text-4xl font-bold">{{ currentPost.title }}</h1>
    <p class="text-gray-400">By {{ currentPost.author }}</p>
    <p class="mt-4">{{ currentPost.content }}</p>
  </div>
</template>

<script setup>
const route = useRoute();
const blogpostStore = useBlogpostStore();

// Check if the post is already in store
const currentPost = blogpostStore.posts.find((post) => post.id == route.params.id)

// onMounted(() => {
//   blogpostStore.fetchPostById(route.params.id);
// });
</script>