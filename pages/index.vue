<template>
  <div>
    <h1 class="text-3xl font-bold my-4 sm:my-8">Latest Blog Posts</h1>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
      <BlogPostCard v-for="post in blogPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
const blogPosts = [
  { id: 1, title: "First Post", img: "/images/img_placeholder.png", description: "This is my first blog post.", author: "Admin" },
  { id: 2, title: "Second Post", img: "/images/img_placeholder.png", description: "This is my first blog post.", author: "User A" },
  { id: 3, title: "First Post", img: "/images/img_placeholder.png", description: "This is my first blog post.", author: "Admin" },
  { id: 4, title: "Second Post", img: "/images/img_placeholder.png", description: "This is my first blog post.", author: "User A" },
  { id: 5, title: "First Post", img: "/images/img_placeholder.png", description: "This is my first blog post.", author: "Admin" },
  { id: 6, title: "Second Post", img: "/images/img_placeholder.png", description: "This is my first blog post.", author: "User A" },
  { id: 7, title: "First Post", img: "/images/img_placeholder.png", description: "This is my first blog post.", author: "Admin" },
  { id: 8, title: "Second Post", img: "/images/img_placeholder.png", description: "This is my first blog post.", author: "User A" }
]
</script>