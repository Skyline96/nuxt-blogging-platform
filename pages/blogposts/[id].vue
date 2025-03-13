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

// Ensure posts are available before finding the post
const currentPost = computed(() => {
  return blogpostStore.posts.find((post) => post.id == route.params.id);
});

// If the post is not in store, fetch it from API
watchEffect(() => {
  if (!currentPost.value) {
    blogpostStore.fetchPostById(route.params.id);
  }
});

useSeoMeta({
  title: () => currentPost.value.title,
  description: () => `${currentPost.value.title} - Expolore this blogpost`
})
</script>