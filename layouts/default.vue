<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-600 text-white p-4">
      <nav class="container mx-auto flex justify-between">
        <NuxtLink to="/" class="text-xl font-bold">Blogging Platform</NuxtLink>
        <div v-if="loggedIn" class="">
          <NuxtLink to="/" class="px-3">Hi, {{ user.name }}</NuxtLink>
          <button @click="logout" class="px-3 py-1.5 border border-white rounded">Logout</button>
        </div>
        <div v-if="!loggedIn">
          <NuxtLink to="/login" class="px-3">Login</NuxtLink>
          <NuxtLink to="/register" class="px-3">Register</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto px-4">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      © 2025 My Blog - All Rights Reserved
    </footer>
  </div>
</template>

<script setup>
const { loggedIn, user, clear: clearSession } = useUserSession()

const logout = async () => {
  await clearSession()
  await navigateTo('/login')
}
</script>