<script setup lang="ts">
const props = defineProps({
  isShow: Boolean
});
</script>

<template>
  <Transition>
    <template v-if="isShow">
      <div class="root">aaa</div>
    </template>
  </Transition>
</template>

<style lang="scss">
.root {
  position: fixed;
  backdrop-filter: blur(4px);
}
</style>
