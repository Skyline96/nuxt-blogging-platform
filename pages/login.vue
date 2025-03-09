<template>
  <div class="max-w-md mx-auto bg-white p-6">
    <form @submit.prevent="login">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <input v-model="credentials.email" type="email" placeholder="Email"
        class="w-full p-2 border border-gray-300 rounded mb-3" />
      <input v-model="credentials.password" type="password" placeholder="Password"
        class="w-full p-2 border border-gray-300 rounded mb-3" />
      <button type="submit" class="bg-blue-600 text-white w-full p-2 rounded">Login</button>
    </form>
  </div>
</template>

<script setup>
const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive({
  email: '',
  password: '',
})

async function login() {
  $fetch('/api/auth/login', {
    method: 'POST',
    body: credentials
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo('/')
    })
    .catch(() => alert('Bad credentials'))
}
</script>