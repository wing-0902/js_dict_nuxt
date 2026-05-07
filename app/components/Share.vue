<script setup lang='ts'>
const route = useRoute();
</script>

<template>
<button v-if="route.meta.share" i-hugeicons-share-03></button>
</template>