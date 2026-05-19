<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  addToHistory,
  getHistoryList,
  clearHistory
} from '~/utils/handleHistory';

// 状態管理
const isOpen = ref(false);
const historyList = ref<string[]>([]);

// 双方向バインディング用のProps設定
const currentQuery = defineModel<string>('currentQuery');

// 履歴を最新順に取得して反映する関数
async function loadHistory() {
  try {
    const list = await getHistoryList();
    // unstorageから返ってくるデータの構造に合わせてマッピング
    historyList.value = list.map((item: any) => item.word);
  } catch (err) {
    console.error('履歴の取得に失敗しました:', err);
  }
}

// 初期マウント時に履歴を読み込む
onMounted(() => {
  loadHistory();
});

// 履歴をクリックしたとき
async function handleClick(newQuery: string) {
  if (!newQuery || newQuery.trim() === '') return;

  if (typeof window !== 'undefined') {
    await addToHistory(newQuery); // 新しい関数で保存
    await loadHistory(); // 保存されたのでリストを再更新
    currentQuery.value = newQuery;
    isOpen.value = false;
  }
}

// 履歴を全消去するとき
async function handleClearAll() {
  if (confirm('検索履歴をすべて消去しますか？')) {
    await clearHistory();
    await loadHistory(); // 空になった状態を反映
  }
}
</script>

<template>
  <div class="root">
    <button class="history" title="履歴を表示" @click="isOpen = !isOpen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path
          d="M480-120q-126 0-223-76.5T131-392q-4-15 6-27.5t27-14.5q16-2 29 6t18 24q24 90 99 147t170 57q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h70q17 0 28.5 11.5T360-600q0 17-11.5 28.5T320-560H160q-17 0-28.5-11.5T120-600v-160q0-17 11.5-28.5T160-800q17 0 28.5 11.5T200-760v54q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm40-376 100 100q11 11 11 28t-11 28q-11 11-28 11t-28-11L452-452q-6-6-9-13.5t-3-15.5v-159q0-17 11.5-28.5T480-680q17 0 28.5 11.5T520-640v144Z"
        />
      </svg>
    </button>

    <div class="slot" :class="{ isClosed: !isOpen }">
      <div class="header">
        <div class="side"></div>
        <h3>検索履歴</h3>
        <div class="side">
          <button aria-label="履歴を全消去" @click="handleClearAll">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <template v-if="historyList.length > 0">
        <ul>
          <li v-for="word in historyList" :key="word">
            <button
              :aria-label="`${word}を検索`"
              @click="handleClick(word)"
              class="searchOne"
            >
              {{ word }}
            </button>
            <button class="delOne" :aria-label="`${word}を削除`">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path
                  d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul>
          <p>履歴がありません．</p>
          <p>まずは検索してみましょう．</p>
        </ul>
      </template>
    </div>

    <div
      v-if="isOpen"
      class="background"
      title="履歴を閉じる"
      @click="isOpen = false"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;
  button.history {
    background: transparent;
    width: 100%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--foreground);
  }
  .slot {
    position: fixed;
    z-index: 99999;
    top: 40px;
    left: 0px;
    backdrop-filter: blur(10px) brightness(70%);
    background-color: var(--codeBack);
    border: 1px solid var(--codeBack);
    border-radius: 20px;
    width: 300px;
    max-height: 600px;
    max-width: calc(100vw - 30px);
    height: calc(100dvh - 40px);
    transition: all 0.25s ease;
    &.isClosed {
      transform: translate3d(calc(10px - 50%), calc(-50% - 20px), 0) scale(0);
    }
    @media (max-width: 830px) {
      width: calc(100vw - 50px);
      left: 30px;
      &.isClosed {
        transform: translate3d(calc(50% - 10px), calc(-50% - 20px), 0) scale(0);
      }
    }

    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      padding: 0 7px;
      justify-content: space-between;
      align-items: center;
      transform: translateY(6px);
      height: 25px;
      .side {
        width: 25px;
        height: 100%;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border: none;
          background: transparent;
          color: var(--foreground);
          svg {
            transform: scale(160%);
          }
        }
      }
    }
    ul {
      height: calc(100% - 25px);
      overflow-x: hidden;
      overflow-y: scroll;
      font-size: 18px;
      li {
        height: 40px;
        margin: 0 20px 0 -10px;
        padding-left: 20px;
        display: flex;
        align-items: center;
        border-radius: 20px;
        &:hover {
          background-color: var(--codeBack);
        }
        justify-content: space-between;
        button {
          background-color: transparent;
          border: none;
          color: var(--foreground);
          font-size: 18px;
          height: 100%;
          &.searchOne {
            width: 100%;
            text-align: left;
          }
          &.delOne {
            height: 30px;
            width: 30px;
            display: flex;
            align-items: center;
            border-radius: 15px;
            &:hover {
              background-color: var(--codeBack);
            }
          }
        }
      }
      p {
        text-align: center;
      }
    }
  }
  .background {
    z-index: 500;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
  }
}
</style>
