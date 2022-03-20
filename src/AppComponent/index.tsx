import React, { useEffect, useRef, useState } from 'react';

import RecButtonPane from './components/RecButtonPane';
import AudioItemTable from './components/AudioItemTable';

export type AudioItem = {
  dataURI: string;
  duration: number;
  beatCount: number;
  assignmentId: string;
};

const AppComponent = ({
  beatCount,
  assignmentId,
}: {
  beatCount: number;
  assignmentId: string;
}) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);

  useEffect(() => {
    // localStorageから全て読み込み
    const audioItems: AudioItem[] = [];
    for (const key of Object.keys(localStorage)) {
      const item = localStorage.getItem(key);
      if (!!item) {
        try {
          const parsed = JSON.parse(item) as AudioItem;
          // 型チェック
          if (
            !!parsed.dataURI &&
            !!parsed.duration &&
            !!parsed.beatCount &&
            !!parsed.assignmentId
          ) {
            audioItems.push(parsed);
          }
        } catch (e) {
          console.log('incorrect audio item');
        }
      }
    }
    setAudioItems(audioItems);
  }, []);

  const deleteAudio = (index: number) => {
    const cloned = [...audioItems];
    cloned.splice(index, 1);
    setAudioItems(cloned);
  };

  const pushAudioItem = (audioItem: AudioItem) => {
    const newAudioItems = [...audioItems, audioItem];
    setAudioItems(newAudioItems);
    // localStorageに保存
    localStorage.setItem(String(Date.now()), JSON.stringify(audioItem));
  };

  return (
    <div>
      <RecButtonPane
        beatCount={beatCount}
        assignmentId={assignmentId}
        audioContextRef={audioContextRef}
        pushAudioItem={pushAudioItem}
      />
      <AudioItemTable
        audioItems={audioItems}
        audioContextRef={audioContextRef}
        deleteAudio={deleteAudio}
      />
    </div>
  );
};

export default AppComponent;
