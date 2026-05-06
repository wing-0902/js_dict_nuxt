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
      <li w-full>
        <NuxtLink :to="word.actualPath" flex w-full justify-between>
          {{ word.title }}
          <div>
            <span v-if="word.jsInclude" i-hugeicons-java-script></span>
            <span v-if="word.tsInclude" i-hugeicons-typescript-01></span>
          </div>
        </NuxtLink>
      </li>
    </template>
    <hr />
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
