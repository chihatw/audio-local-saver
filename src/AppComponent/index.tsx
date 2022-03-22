import React, { useEffect, useMemo, useState } from 'react';

import CheckPane from './components/CheckPane';
import useAudioItems from './services/useAudioItems';
import RecButtonPane from './components/RecButtonPane';
import AudioItemTable from './components/AudioItemTable';
import SetupButtonPane from './components/SetupButtonPane';
import { LocalStorageAdaptor } from './classes/LocalStorageAdoptor';
import { AudioContextFactory } from './classes/AudioContextFactory';

export type AudioItem = {
  id: string;
  bpm: number;
  dateId: string;
  dataURI: string;
  workoutId: string;
  isPerfect: boolean;
};

const AppComponent = ({
  dateId,
  workoutId,
  beatCount,
}: {
  dateId: string;
  beatCount: number;
  workoutId: string;
}) => {
  const { deleteAudioItem } = useAudioItems();
  const localStorageAdaptor = useMemo(
    () => new LocalStorageAdaptor({ dateId, workoutId }),
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
    const targetId = audioItems[index].id;

    const cloned = [...audioItems];
    cloned.splice(index, 1);
    setAudioItems(cloned);
    localStorageAdaptor.audiItems = cloned;

    deleteAudioItem(targetId);
  };

  const pushAudioItem = (audioItem: AudioItem) => {
    localStorageAdaptor.saveAudioItem(audioItem);
    const newAudioItems = [...audioItems, audioItem];
    localStorageAdaptor.audiItems = newAudioItems;
    setAudioItems(newAudioItems);
  };

  const updateLastAudioItem = (audioItem: AudioItem) => {
    localStorageAdaptor.updateAudioItem(audioItem);
    const cloned = [...audioItems];
    cloned[cloned.length - 1] = audioItem;
    setAudioItems(cloned);
    localStorageAdaptor.audiItems = cloned;
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
            dateId={dateId}
            beatCount={beatCount}
            workoutId={workoutId}
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
              audioItem={audioItems[audioItems.length - 1]}
              audioContext={audioContext}
              deleteAudio={() => deleteAudio(audioItems.length - 1)}
              setIsChecking={setIsChecking}
              updateLastAudioItem={updateLastAudioItem}
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
