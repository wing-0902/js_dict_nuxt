import Dexie, { type Table } from 'dexie';

interface HistoryItem {
  timestamp: number;
  word: string;
}

export class MyDatabase extends Dexie {
  history!: Table<HistoryItem>;

  constructor() {
    super('HistoryIndex');
    this.version(1).stores({
      history: 'timestamp, word'
    });
  }
}

export const db = process.client ? new MyDatabase() : null as any;

export default async function saveHistory(word: string) {
  if (!db) return; // サーバーサイドでは何もしない

  await db.transaction('readwrite', db.history, async () => {
    await db.history.where('word').equals(word).delete();

    await db.history.add({
      timestamp: Date.now(),
      word: word
    });
  });
}
