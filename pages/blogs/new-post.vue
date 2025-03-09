<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Create Blog Post</h2>
    <input type="text" v-model="title" placeholder="Title" class="w-full p-2 border border-gray-200 rounded mb-3">
    <textarea v-model="content" placeholder="Content" class="w-full p-2 border border-gray-200 rounded mb-3"></textarea>
    <button class="bg-green-600 text-white w-full p-2 rounded">Publish</button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['authenticated'],
})

const title = ref("")
const content = ref("")
</script>