<script setup lang="ts">
const query = ref('');
const mode = ref('見出し');
</script>

<template>
  <div h-full w-full p-3 pr-1>
    <section h-full w-full flex flex-col p-3 class="root">
      <div h-10 w-full flex class="searchSlot">
        <input h-full w-full type="text" v-model="query" />
        <button
          h-full
          w-7
          i-material-symbols-light:history-2-rounded
          class="historyButton"
        ></button>
      </div>
      <div mt-2 h-8 w-full flex class="changeButtonSlot">
        <button :class="{ select: mode === '見出し' }" @click="mode = '見出し'">
          見出し
        </button>
        <button :class="{ select: mode === '用例' }" @click="mode = '用例'">
          用例
        </button>
        <button :class="{ select: mode === '全文' }" @click="mode = '全文'">
          全文
        </button>
      </div>

      <div class="others" h-full w-full mt-3>
        <TitleSearch v-if="mode === '見出し'" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.root {
  backdrop-filter: brightness(1.2);
  border-radius: 16px;

  .searchSlot {
    input {
      background-color: var(--codeBack);
      font-family: 'Fira Code Variable', 'M PLUS 1 Code Variable', monospace;
      color: white;
      font-size: 18px;
      border: none;
      border-radius: 20px;
      &:focus {
        outline: none;
        color: var(--themeColor);
      }
    }
  }

  .changeButtonSlot {
    button {
      background-color: transparent;
      border-radius: 0;
      border: 1px solid var(--themeColor);
      color: var(--themeColor);
      &:nth-child(1) {
        border-radius: 16px 0 0 16px;
      }
      &:nth-child(2) {
        border-width: 1px 0;
      }
      &:nth-last-child(1) {
        border-radius: 0 16px 16px 0;
      }
      height: 100%;
      width: calc(100% / 3);
      font-family: 'Zen Kaku Gothic New', sans-serif;
      font-size: 18px;
      &.select {
        background-color: var(--themeColor);
        color: var(--codeBack);
      }
    }
  }
}

.others {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
