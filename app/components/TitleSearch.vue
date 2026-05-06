<script setup lang="ts">
const { data: words } = await useAsyncData('all-dictionary', async () => {
  const result = await queryCollection('dictionary').all()
  
  return result.map(word => ({
    ...word,
    actualPath: '/content/' + word.path.replace('/dict/', '')
  }))
})
</script>

<template>
  <ul>
    <li v-for="word in words" :key="word.path">
      <NuxtLink :to="word.actualPath">
        {{ word.title }}
      </NuxtLink>
      </li>
    </ul>
</template>