import React, { useEffect, useMemo, useState } from 'react';

import CheckPane from './components/CheckPane';
import RecButtonPane from './components/RecButtonPane';
import AudioItemTable from './components/AudioItemTable';
import SetupButtonPane from './components/SetupButtonPane';
import { LocalStorageAdaptor } from './classes/LocalStorageAdoptor';
import { AudioContextFactory } from './classes/AudioContextFactory';

export type AudioItem = {
  id: string;
  bpm: number;
  dataURI: string;
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

  const [isChecking, setIsChecking] = useState(false);
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
    localStorageAdaptor.audiItems = cloned;
  };

  const pushAudioItem = (audioItem: AudioItem) => {
    localStorageAdaptor.saveAudioItem(audioItem);
    const newAudioItems = [...audioItems, audioItem];
    localStorageAdaptor.audiItems = newAudioItems;
    setAudioItems(newAudioItems);
  };

  const handleSetup = async () => {
    const factory = new AudioContextFactory();
    const audioContext = factory.create();
    setAudioContext(audioContext);
  };

  const handleStartChecking = () => {
    setIsChecking(true);
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
            handleStartChecking={handleStartChecking}
          />
          <AudioItemTable
            audioItems={audioItems}
            audioContext={audioContext}
            deleteAudio={deleteAudio}
          />
          {isChecking && audioItems[audioItems.length - 1] && (
            <CheckPane
              bpm={audioItems[audioItems.length - 1].bpm}
              dataURI={audioItems[audioItems.length - 1].dataURI}
              audioContext={audioContext}
              setIsChecking={setIsChecking}
              deleteAudio={() => deleteAudio(audioItems.length - 1)}
            />
          )}
        </>
      ) : (
        <SetupButtonPane handleSetup={handleSetup} />
      )}
    </div>
  );
};

export default AppComponent;
