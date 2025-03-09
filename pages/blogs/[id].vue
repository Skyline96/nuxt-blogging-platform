<template>
  <div>
    <h1 class="text-4xl font-bold">{{ post.title }}</h1>
    <p class="text-gray-400">By {{ post.author }}</p>
    <p class="mt-4">{{ post.content }}</p>
  </div>
</template>

<script setup>
const route = useRoute()
const post = ref({
  id: route.params.id,
  title: "Sample Blog Post",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus delectus quod aspernatur dolorum qui atque, corporis magnam iste doloribus! Nam esse repudiandae quis, architecto reprehenderit ea doloribus nisi voluptatibus a enim eos fugiat consequuntur ab perspiciatis eaque dolorum nulla odit consectetur? Molestias nisi labore optio ratione iste aliquam quam officia sapiente, placeat a? Atque temporibus in odit alias accusamus sed nostrum, accusantium tempora minima quibusdam ducimus beatae dolorem nesciunt! Quis perspiciatis natus, distinctio quasi velit earum dolores aliquid inventore ullam officiis eum dicta voluptate non excepturi debitis nihil ducimus saepe ipsum. Expedita atque quisquam totam quasi autem minima explicabo aliquam voluptatibus ducimus architecto velit perferendis nesciunt sequi facere obcaecati excepturi hic, corrupti possimus odio placeat alias, repellat quae ipsam? Impedit officiis placeat debitis quis quibusdam ex reprehenderit nihil? Nobis aperiam beatae sunt modi odit enim eum! Doloremque, reprehenderit? Itaque, quo? Alias, cumque ad expedita quasi vel hic laudantium esse aspernatur similique iusto quos in omnis deserunt, sit doloremque quae amet dolorum voluptas explicabo odio natus. Quisquam libero modi minima ipsa cupiditate explicabo accusantium molestiae, dolore autem fugiat perferendis ab officiis doloremque odio aperiam nulla assumenda deleniti. Perferendis corporis est vitae asperiores, laboriosam nam voluptates tempore possimus. Iusto temporibus ullam nemo!",
  author: "Admin"
})
</script>