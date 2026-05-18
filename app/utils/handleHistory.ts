import { createStorage } from 'unstorage';
import indexedDbDriver from 'unstorage/drivers/indexedb';

const storage = createStorage({
  driver: indexedDbDriver({
    base: 'history:',
    dbName: 'dict-app',
    storeName: 'query-history'
  })
});

// 履歴を追加
export async function addToHistory(word: string) {
  const latestItem = await getLatestHistoryItem();

  if (latestItem && latestItem.word === word) {
    console.log('重複をスキップ');
    return;
  }
  const now = new Date();

  const key = `item:${now.getTime()}`;

  const data = {
    word: word,
    timestamp: now
  };

  await storage.setItemRaw(key, data);

  console.log('保存成功：', word);
  return;
}

// 最後の項目を取得
async function getLatestHistoryItem() {
  const keys = await storage.getKeys();

  if (keys.length === 0) return null;

  keys.sort((a, b) => {
    const partA = a.split(':').pop() || '';
    const partB = b.split(':').pop() || '';

    const timeA = parseInt(partA, 10);
    const timeB = parseInt(partB, 10);

    return timeB - timeA;
  });

  return await storage.getItemRaw(keys[0]!);
}

// 履歴一覧を取得
export async function getHistoryList() {
  const keys = await storage.getKeys();

  const list = [];
  for (const key of keys) {
    const item = await storage.getItemRaw(key);
    if (item) {
      list.push(item);
    }
  }

  list.sort((a, b) => b.timestamp - a.timestamp);

  return list;
}

// 履歴をクリア
export async function clearHistory() {
  storage.clear();
}
