<script setup lang="ts">
const { data: words } = await useAsyncData('all-dictionary', async () => {
  const result = await queryCollection('dictionary').all();

  return result.map((word) => ({
    ...word,
    actualPath: '/content/' + word.path.replace('/dict/', '')
  }));
});
</script>

<template>
  <ul class="listRoot">
    <template v-for="word in words" :key="word.path">
      <hr />
      <li>
        <NuxtLink :to="word.actualPath">
          {{ word.title }}
        </NuxtLink>
      </li>
    </template>
  </ul>
</template>

<style lang="scss" scoped>
.listRoot {
  list-style-type: none;
  text-align: left;
  font-family: 'Fira Code Variable', 'M PLUS 1 Code Variable', monospace;
  font-size: 20px;
  hr {
    height: 1px;
  }
  li {
    margin-left: -16px;
    a {
      color: var(--themeColor);
      text-decoration: none;
    }
  }
}
</style>
