<template>
  <div class="max-w-md mx-auto bg-white p-6">
    <form @submit.prevent="onSubmit" novalidate>
      <h2 class="text-3xl font-bold mb-8">Login</h2>
      <div class="relative mb-8">
        <input v-model="loginCredentials.email" type="email" placeholder="Email"
          class="w-full p-2 border border-gray-300 rounded" />
        <p v-show="loginFormErrors.email" class="absolute inset-x-0 ps-0.5 pt-0.5 text-sm text-red-600">{{
          loginFormErrors.email }}</p>
      </div>
      <div class="relative mb-8">
        <input v-model="loginCredentials.password" type="password" placeholder="Password"
          class="w-full p-2 border border-gray-300 rounded" />
        <p v-show="loginFormErrors.password" class="absolute inset-x-0 ps-1 pt-0.5 text-sm text-red-600">{{
          loginFormErrors.password }}</p>
      </div>
      <div class="relative mb-8">
        <button type="submit" class="bg-blue-600 text-white w-full p-2 rounded">Login</button>
        <p v-show="errorMessage" class="absolute inset-x-0 ps-1 pt-0.5 text-sm text-red-600 text-center">{{
          errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
const { fetch: refreshSession } = useUserSession()
const loginCredentials = reactive({
  email: '',
  password: '',
});

const loginFormErrors = ref({});
const errorMessage = ref(null);

const validateLoginFormData = () => {
  // Parse form data without throwing an error
  const result = loginFormSchema.safeParse(loginCredentials);

  // Display errors
  if (!result.success) {
    loginFormErrors.value = result.error.errors.reduce((acc, error) => {
      const key = error.path[0];
      acc[key] = error.message;
      return acc
    }, {})

    return false;
  }

  // Reset errors if data are valid
  loginFormErrors.value = {};
  return true;
};

// Handle form submission
const onSubmit = async () => {
  // Reset error message
  errorMessage.value = '';

  // Check if validation failed
  if (!validateLoginFormData()) return;

  $fetch('/api/auth/login', { method: 'POST', body: loginCredentials })
    .then(async () => {
      // Reset input fields
      loginCredentials.email = ''
      loginCredentials.password = ''

      // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo('/')
    })
    .catch((error) => {
      errorMessage.value = error.statusMessage;
    })
};
</script>