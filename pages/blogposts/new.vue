<template>
  <div class="max-w-2xl mx-auto bg-white p-6">
    <h2 class="text-3xl font-bold mb-8">Create Blog Post</h2>
    <form @submit.prevent="onSubmit" novalidate>
      <div class="relative mb-8">
        <input type="text" v-model="newBlogpostData.title" placeholder="Title" autocomplete="on"
          class="w-full p-2 border border-gray-300 rounded" />
        <p v-show="newBlogpostFormErrors.title" class="absolute inset-x-0 ps-0.5 pt-0.5 text-sm text-red-600">{{
          newBlogpostFormErrors.title }}</p>
      </div>
      <div class="relative mb-8">
        <textarea v-model="newBlogpostData.content" placeholder="Content" autocomplete="on"
          class="w-full p-2 border border-gray-300 rounded"></textarea>
        <p v-show="newBlogpostFormErrors.content" class="absolute inset-x-0 ps-0.5 pt-0.5 text-sm text-red-600">{{
          newBlogpostFormErrors.content }}</p>
      </div>
      <div class="relative mb-8">
        <button type="submit" class="bg-blue-600 text-white w-full p-2 rounded">Publish</button>
        <p v-show="errorMessage" class="absolute inset-x-0 ps-1 pt-0.5 text-sm text-red-600 text-center">{{
          errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['authenticated'],
})

useSeoMeta({
  title: 'Create blog post',
  description: 'Create new blogpost on this platform'
})

const blogpostStore = useBlogpostStore()

const newBlogpostData = reactive({
  title: '',
  content: '',
})

const newBlogpostFormErrors = ref({});
const errorMessage = ref(null);

const validateNewBlogpostFormData = () => {
  // Parse form data without throwing an error
  const result = newBlogpostFormSchema.safeParse(newBlogpostData);

  // Display errors
  if (!result.success) {
    newBlogpostFormErrors.value = result.error.errors.reduce((acc, error) => {
      const key = error.path[0];
      acc[key] = error.message;
      return acc
    }, {})

    return false;
  }

  // Reset errors if data are valid
  newBlogpostFormErrors.value = {};
  return true;
};

// Handle form submission
const onSubmit = async () => {
  // Reset error message
  errorMessage.value = '';

  // Check if validation failed
  if (!validateNewBlogpostFormData()) return;

  $fetch('/api/blogposts', { method: 'POST', body: newBlogpostData })
    .then(async () => {
      // Reset input fields
      newBlogpostData.title = ''
      newBlogpostData.content = ''

      //Refetch the posts
      await blogpostStore.fetchPosts()
      await blogpostStore.fetchUserPosts()
      // Redirect to the home page
      await navigateTo('/dashboard/user-posts')
    })
    .catch((error) => {
      errorMessage.value = error.statusMessage;
      console.log(error);
    })
};
</script>