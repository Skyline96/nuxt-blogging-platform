<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-600 text-white p-4">
      <nav class="container mx-auto flex justify-between">
        <NuxtLink to="/" class="text-xl font-bold">Blogging Platform</NuxtLink>
        <div>
          <NuxtLink to="/login" class="px-3">Login</NuxtLink>
          <NuxtLink to="/register" class="px-3">Register</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto p-4 flex-grow">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      © 2025 My Blog - All Rights Reserved
    </footer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>