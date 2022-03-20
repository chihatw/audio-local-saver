import React, { useEffect, useMemo, useRef, useState } from 'react';

import RecButtonPane from './components/RecButtonPane';
import AudioItemTable from './components/AudioItemTable';
import { LocalStorageAdaptor } from './classes/LocalStorageAdoptor';

export type AudioItem = {
  id: string;
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
  const localStorageAdoptor = useMemo(
    () => new LocalStorageAdaptor(assignmentId),
    []
  );
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setAudioItems(localStorageAdoptor.getAudioItems());
  }, []);

  const deleteAudio = (index: number) => {
    localStorageAdoptor.removeAudioItem(index);

    const cloned = [...audioItems];
    cloned.splice(index, 1);
    setAudioItems(cloned);
  };

  const pushAudioItem = (audioItem: AudioItem) => {
    localStorageAdoptor.saveAudioItem(audioItem);

    const newAudioItems = [...audioItems, audioItem];
    setAudioItems(newAudioItems);
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
        setErrMsg={setErrMsg}
      />
      <div>{errMsg}</div>
    </div>
  );
};

export default AppComponent;
