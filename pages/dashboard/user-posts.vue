<template>
  <div>
    <h1 class="text-3xl font-bold my-4 sm:my-8">My Blog Posts</h1>
    <div class="">
      <div class="ms-auto my-6">
        <NuxtLink to="/blogposts/new" class="inline-block px-3 py-1.5 rounded bg-gray-800 text-white">Create New Blog
        </NuxtLink>
      </div>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
      <BlogPostCard v-for="post in blogpostStore.userPosts" :key="post.id" :post="post">
        <div class="mt-4 flex justify-between items-center">
          <!-- <button @click="blogpostStore.editPost(post.id)" class="inline-block cursor-pointer px-3 py-1.5 rounded bg-gray-800 text-white">Edit</button> -->
          <button @click="blogpostStore.deletePost(post.id)" class="inline-block cursor-pointer px-3 py-1.5 rounded bg-gray-800 text-white">Delete</button>
        </div>
      </BlogPostCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['authenticated'],
})

const { user } = useUserSession()

useSeoMeta({
  title: `${user.value.name}'s posts`,
  description: 'See posts published by you'
})

const blogpostStore = useBlogpostStore()

onMounted(() => {
  blogpostStore.fetchUserPosts();
});
</script>