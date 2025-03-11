import { defineStore } from 'pinia';

export const useBlogpostStore = defineStore('blogpost', () => {
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPosts = async () => {
    loading.value = true;

    await $fetch('/api/blogposts')
      .then((resp) => {
        posts.value = resp
      })
      .catch((err) => {
        error.value = err.statusMessage;
      })

    loading.value = false;
  }

  const fetchPostById = async (id) => {
    // Fetch from API if not found in `posts`
    loading.value = true;
    await $fetch(`/api/blogposts/${id}`)
      .then((resp) => {
        currentPost.value = resp
      })
      .catch((err) => {
        error.value = err.statusMessage;
        console.error(`fetchPostById(${id}) Error:`, err);
      })
    loading.value = false;
  }

  return { posts, loading, error, fetchPosts, fetchPostById };
}, {
  persist: {
    storage: piniaPluginPersistedstate.cookies()
  }
});
