<script setup lang="ts">
const query = ref('');
</script>

<template>
  <div h-full w-full p-3>
    <section h-full w-full p-3 class="root">
      <div h-10 class="searchSlot">
        <input h-full w-full type="text" v-model="query" />
        <button
          h-full
          w-7
          i-material-symbols-light:history-2-rounded
          class="historyButton"
        ></button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.root {
  backdrop-filter: brightness(1.2);
  border-radius: 16px;
  .searchSlot {
    display: flex;
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
}
</style>
