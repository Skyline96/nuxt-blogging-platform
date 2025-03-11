import { defineStore } from 'pinia';

export const useBlogpostStore = defineStore('blogpost', () => {
  const posts = ref([]); // All blog posts
  const userPosts = ref([]); // Logged-in user's posts
  const currentPost = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      loading.value = true;
      const res = await $fetch('/api/blogposts');
      posts.value = res;
    } catch (err) {
      error.value = err?.statusMessage || "Failed to fetch posts";
      console.error("fetchPosts() Error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Fetch posts of the logged-in user
  const fetchUserPosts = async () => {
    try {
      loading.value = true;
      const res = await $fetch('/api/blogposts/user');
      userPosts.value = res;
    } catch (err) {
      error.value = err?.statusMessage || "Failed to fetch user posts";
      console.error("fetchUserPosts() Error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Fetch a single post by ID
  const fetchPostById = async (id) => {
    try {
      loading.value = true;
      const res = await $fetch(`/api/blogposts/${id}`);
      currentPost.value = res;
    } catch (err) {
      error.value = err?.statusMessage || `Post ${id} not found`;
      console.error(`fetchPostById(${id}) Error:`, err);
    } finally {
      loading.value = false;
    }
  };

  return { posts, userPosts, currentPost, loading, error, fetchPosts, fetchUserPosts, fetchPostById };
}, {
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    })
  }
});