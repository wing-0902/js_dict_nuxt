<script setup lang='ts'>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('dictionary').path(`/dict/${slug}`).first()
})
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <div v-if="post">
    <h1>
      {{ post.title }}
      <small i-hugeicons-java-script v-if="post.jsInclude">JS</small>
      <small i-hugeicons-typescript-01 v-if="post.tsInclude">TS</small>
      <small>（{{ post.品詞 }}）</small>
    </h1>
    <ContentRenderer :value="post" />
  </div>
  <div v-else>
    <h1>Not Found</h1>
    <p>読み込み中またはコンテンツが存在しません．</p>
  </div>
</template>
