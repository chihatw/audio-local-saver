import { Button } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import RecButtonPane from './components/RecButtonPane';
import AudioItemTable from './components/AudioItemTable';
import { LocalStorageAdaptor } from './classes/LocalStorageAdoptor';
import { AudioContextFactory } from './classes/AudioContextFactory';

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
  const localStorageAdaptor = useMemo(
    () => new LocalStorageAdaptor(assignmentId),
    []
  );
  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    setAudioItems(localStorageAdaptor.getAudioItems());
  }, []);

  const deleteAudio = (index: number) => {
    localStorageAdaptor.removeAudioItem(index);

    const cloned = [...audioItems];
    cloned.splice(index, 1);
    setAudioItems(cloned);
  };

  const pushAudioItem = (audioItem: AudioItem) => {
    localStorageAdaptor.saveAudioItem(audioItem);

    const newAudioItems = [...audioItems, audioItem];
    setAudioItems(newAudioItems);
  };

  const handlePlay = async () => {
    const factory = new AudioContextFactory();
    const audioContext = factory.create();
    setAudioContext(audioContext);
  };

  return (
    <div>
      {audioContext ? (
        <>
          <RecButtonPane
            beatCount={beatCount}
            assignmentId={assignmentId}
            audioContext={audioContext}
            pushAudioItem={pushAudioItem}
          />
          <AudioItemTable
            audioItems={audioItems}
            audioContext={audioContext}
            deleteAudio={deleteAudio}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ height: 120 }}>
            <Button color='primary' onClick={handlePlay} variant='outlined'>
              こんにちは
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppComponent;
