<script setup lang='ts'>
const route = useRoute();
</script>

<template>
  <div class="root" m-0 p-0 flex flex-col>
    <div class="header" m-0>
      <Header />
    </div>
    <div class="content" m-0 flex>
      <div h-full class='sidebar' :class="{ 'hidden': route.meta.hideSidebar, 'contentMain': route.meta.contentMain}">
        <SearchEntry />
      </div>
      <div h-full class='contentSlot' :class="{ 'contentMain': route.meta.contentMain}">
        <div h-8>
          {{ route.meta.menuTitle || 'Dictionary' }}
        </div>
        <div class='slotBox'>
          <slot />
        </div>
        <div h-8></div>
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

.sidebar {
  width: 460px;
  &.hidden {
    display: none;
  }
  @media (max-width: 900px) {
    width: 100vw;
    &.contentMain {
      display: none;
    }
  }
}

.contentSlot {
  width: 100%;
  @media (max-width: 900px) {
    width: 0;
    &.contentMain {
      width: 100%;
    }
  }
}

.slotBox {
  height: calc(100% - 64px);
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
