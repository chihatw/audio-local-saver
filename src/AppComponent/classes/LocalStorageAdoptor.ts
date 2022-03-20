import { AudioItem } from '..';

export class LocalStorageAdaptor {
  private _audioItems: AudioItem[] = [];
  private _assignmentId: string;

  constructor(assignmentId: string) {
    this._assignmentId = assignmentId;
  }

  set audiItems(value: AudioItem[]) {
    this._audioItems = value;
  }

  getAudioItems() {
    // localStorageから全て読み込み
    const audioItems: AudioItem[] = [];
    for (const key of Object.keys(localStorage)) {
      const item = localStorage.getItem(key);
      if (!!item) {
        try {
          const parsed = JSON.parse(item) as AudioItem;
          // 型チェック
          if (
            !!parsed.id &&
            !!parsed.bpm &&
            !!parsed.dataURI &&
            !!parsed.assignmentId
          ) {
            // assignmentIdが古いものは削除
            if (parsed.assignmentId !== this._assignmentId) {
              localStorage.removeItem(key);
            } else {
              audioItems.push(parsed);
            }
          }
        } catch (e) {
          console.log('incorrect audio item');
        }
      }
    }
    const sortedItems = audioItems.sort((a, b) => Number(a.id) - Number(b.id));
    this._audioItems = sortedItems;
    return this._audioItems;
  }
  removeAudioItem(index: number) {
    const audioItem = this._audioItems[index];
    localStorage.removeItem(audioItem.id);
  }
  saveAudioItem(audioItem: AudioItem) {
    localStorage.setItem(audioItem.id, JSON.stringify(audioItem));
  }
}
