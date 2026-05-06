<script setup lang="ts">
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`dict-${slug}`, () => {
  return queryCollection('dictionary').path(`/dict/${slug}`).first();
});

useSeoMeta({
  title: post.value?.title + ' - JavaScript'
});

definePageMeta({
  contentMain: true
});

const route = useRoute();
route.meta.menuTitle = post.value?.title || 'Dictionary';
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <div v-if="post">
    <h1>
      {{ post.title }}
      <small
        class="detail"
        i-hugeicons-java-script
        v-if="post.jsInclude"
      ></small>
      <small
        class="detail"
        i-hugeicons-typescript-01
        v-if="post.tsInclude"
      ></small>
      <small class="detail">（{{ post.品詞 }}）</small>
    </h1>
    <ContentRenderer :value="post" />
  </div>
  <div v-else>
    <h1>Not Found</h1>
    <p>読み込み中またはコンテンツが存在しません．</p>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 18px;
}
</style>
