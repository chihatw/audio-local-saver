import { AudioItem } from '..';

export class LocalStorageAdaptor {
  private _audioItems: AudioItem[] = [];
  private _dateId: string;
  private _workoutId: string;

  constructor({ dateId, workoutId }: { dateId: string; workoutId: string }) {
    this._dateId = dateId;
    this._workoutId = workoutId;
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
            !!parsed.dateId &&
            !!parsed.dataURI &&
            !!parsed.workoutId &&
            typeof parsed.isPerfect === 'boolean'
          ) {
            // assignmentIdが古いものは削除
            if (parsed.dataURI !== this._dateId) {
              localStorage.removeItem(key);
            } else {
              if (parsed.workoutId === this._workoutId) {
                audioItems.push(parsed);
              }
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
  updateAudioItem(audioItem: AudioItem) {
    localStorage.setItem(audioItem.id, JSON.stringify(audioItem));
  }
}
