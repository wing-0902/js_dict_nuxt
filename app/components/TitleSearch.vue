<script setup lang="ts">
import { computed } from 'vue';
import saveHistory from '~/lib/saveHistoryToIndexedDB';

const props = defineProps({
  query: String
});

const { data: words } = await useAsyncData('all-dictionary', async () => {
  const result = await queryCollection('dictionary').all();

  return result.map((word) => ({
    ...word,
    actualPath: '/content/' + word.path.replace('/dict/', '')
  }));
});

// queryプロパティに基づいてフィルタリングされたリストを作成
const filteredWords = computed(() => {
  if (!props.query) return words.value;
  
  const searchLower = props.query.toLowerCase();
  return words.value?.filter((word) => {
    // タイトルまたはパスに検索語が含まれているかチェック
    return (
      word.title?.toLowerCase().includes(searchLower) ||
      word.path?.toLowerCase().includes(searchLower)
    );
  });
});

async function handleSaveHistory(word: string | undefined) {
  if (!word || word.trim() === '') return;

   if (typeof window !== 'undefined') {
      await saveHistory(word);
    }
}
</script>

<template>
  <ul v-if="filteredWords?.length" class="listRoot">
    <template v-for="word in filteredWords" :key="word.path">
      <hr />
      <li w-full>
        <NuxtLink @mousedown="handleSaveHistory(query)" :to="word.actualPath" flex w-full justify-between>
          {{ word.title }}
          <div>
            <span v-if="word.jsInclude" i-hugeicons-java-script></span>
            <span v-if="word.tsInclude" i-hugeicons-typescript-01></span>
          </div>
        </NuxtLink>
      </li>
    </template>
    <hr v-if="filteredWords?.length" />
  </ul>
  <p v-else>条件に合う結果は見つかりませんでした．</p>
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
