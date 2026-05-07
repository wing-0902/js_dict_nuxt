<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="root" m-0 p-0 flex flex-col>
    <div class="header" m-0>
      <Header />
    </div>
    <div class="content" m-0 flex>
      <div
        h-full
        class="sidebar"
        :class="{
          hidden: route.meta.hideSidebar,
          contentMain: route.meta.contentMain
        }"
      >
        <SearchEntry />
      </div>
      <div
        h-full
        pb-3
        pr-4
        pl-2
        class="contentSlot"
        :class="{ contentMain: route.meta.contentMain }"
      >
        <div h-8 w-full>
          <div h-full w-full class="menuBar" flex justify-center items-center>
            {{ route.meta.menuTitle || 'Dictionary' }}
          </div>
        </div>
        <div class="slotBox">
          <slot />
        </div>
        <div h-8 w-full>
          <div h-full w-full class="menuBar" flex justify-center items-center>
            <Share />
          </div>
        </div>
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
  flex-shrink: 0;
  width: var(--searchWidth);
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

.menuBar {
  backdrop-filter: brightness(1.2);
  border-radius: 16px;
}

.contentSlot {
  flex: 1;
  min-width: 0;
  @media (max-width: 900px) {
    width: 0;
    flex: none;
    &.contentMain {
      width: 100%;
    }
  }
}

.slotBox {
  height: calc(100% - 64px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  display: block;
  text-align: left;
}
</style>
