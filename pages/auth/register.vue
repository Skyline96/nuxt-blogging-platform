<template>
  <div class="max-w-md mx-auto bg-white p-6">
    <h2 class="text-3xl font-bold mb-8">Register</h2>
    <form @submit.prevent="onSubmit" novalidate>
      <div class="relative mb-8">
        <input v-model="newUserData.name" type="text" placeholder="Name" autocomplete="on"
          class="w-full p-2 border border-gray-300 rounded" />
        <p v-show="registerFormErrors.name" class="absolute inset-x-0 ps-0.5 pt-0.5 text-sm text-red-600">{{
          registerFormErrors.name }}</p>
      </div>
      <div class="relative mb-8">
        <input v-model="newUserData.email" type="email" placeholder="Email" autocomplete="on"
          class="w-full p-2 border border-gray-300 rounded" />
        <p v-show="registerFormErrors.email" class="absolute inset-x-0 ps-0.5 pt-0.5 text-sm text-red-600">{{
          registerFormErrors.email }}</p>
      </div>
      <div class="relative mb-8">
        <input v-model="newUserData.password" type="password" placeholder="Password" autocomplete="on"
          class="w-full p-2 border border-gray-300 rounded" />
        <p v-show="registerFormErrors.password" class="absolute inset-x-0 ps-1 pt-0.5 text-sm text-red-600">{{
          registerFormErrors.password }}</p>
      </div>
      <div class="relative mb-8">
        <input v-model="newUserData.confirmPassword" type="password" placeholder="Confirm Password"
          class="w-full p-2 border border-gray-300 rounded" />
        <p v-show="registerFormErrors.confirmPassword" class="absolute inset-x-0 ps-1 pt-0.5 text-sm text-red-600">{{
          registerFormErrors.confirmPassword }}</p>
      </div>
      <div class="relative mb-8">
        <button type="submit" class="bg-blue-600 text-white w-full p-2 rounded">Register</button>
        <p v-show="errorMessage" class="absolute inset-x-0 ps-1 pt-0.5 text-sm text-red-600 text-center">{{
          errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Register',
  description: 'Register on this platform to write your own blogposts'
})

const newUserData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const registerFormErrors = ref({});
const errorMessage = ref(null);

const validateRegisterFormData = () => {
  // Parse form data without throwing an error
  const result = registerFormSchema.safeParse(newUserData);

  // Display errors
  if (!result.success) {
    registerFormErrors.value = result.error.errors.reduce((acc, error) => {
      const key = error.path[0];
      acc[key] = error.message;
      return acc
    }, {})

    return false;
  }

  // Reset errors if data are valid
  registerFormErrors.value = {};
  return true;
};

// Handle form submission
const onSubmit = async () => {
  // Reset error message
  errorMessage.value = '';

  // Check if validation failed
  if (!validateRegisterFormData()) return;

  $fetch('/api/auth/register', { method: 'POST', body: newUserData })
    .then(async () => {
      // Reset input fields
      newUserData.name = ''
      newUserData.email = ''
      newUserData.password = ''
      newUserData.confirmPassword = ''

      // Redirect to the home page
      await navigateTo('/auth/login')
    })
    .catch((error) => {
      errorMessage.value = error.statusMessage;
    })
};
</script>