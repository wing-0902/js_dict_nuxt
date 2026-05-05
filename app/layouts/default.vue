<template>
  <div class="root" m-0 p-0 flex flex-col>
    <div class="header" m-0>
      <Header />
    </div>
    <div class="content" m-0>
      <slot />
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
</style>
