<script setup lang='ts'>
const route = useRoute();
</script>

<template>
  <div class="root" m-0 p-0 flex flex-col>
    <div class="header" m-0>
      <Header />
    </div>
    <div class="content" m-0 flex>
      <div h-full w-115 bg-red></div>
      <div bg-green w-full h-full>
        <div h-8 bg-blue>
          {{ route.meta.menuTitle || 'Dictionary' }}
        </div>
        <div class='slotBox'>
          <slot />
        </div>
        <div h-8 bg-blue></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  .header {
    height: 45px;
  }
  .content {
    height: calc(100dvh - 45px);
  }
}

.slotBox {
  height: calc(100% - 64px);
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
