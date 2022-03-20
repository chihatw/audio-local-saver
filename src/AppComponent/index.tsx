import { Button } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

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
  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

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

  const handlePlay = async () => {
    const audioContext = new window.AudioContext();
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0;
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.1);
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
