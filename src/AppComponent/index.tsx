import { Table, TableBody } from '@mui/material';
import React, { useMemo, useRef, useState } from 'react';

import StartButton from './components/StartButton';
import { Recorder } from './classes/Recorder';
import AudioItemRow from './components/AudioItemRow';

const AppComponent = () => {
  const recorder = useMemo(() => new Recorder(), []);

  const audioContextRef = useRef<AudioContext | null>(null);

  const [audioItems, setAudioBuffers] = useState<
    { buffer: AudioBuffer; duration: number }[]
  >([]);

  const handleSetAudioBuffer = (buffer: AudioBuffer | null) => {
    if (buffer) {
      const newItem = { buffer, duration: buffer.duration };
      let cloned = [...audioItems, newItem];

      setAudioBuffers(cloned);
    }
  };

  const handleRecordStart = () => {
    let audioContext = audioContextRef.current;
    if (!audioContext) {
      audioContext = new window.AudioContext();
      audioContextRef.current = audioContext;
    }
    recorder.audioContext = audioContext;
    recorder.setAudioBuffer = handleSetAudioBuffer;
    recorder.start();
  };

  const handleRecordStop = () => {
    if (!recorder) return;
    recorder.stop();
  };

  const handleDeleteAudio = (index: number) => {
    const cloned = [...audioItems];
    cloned.splice(index, 1);
    setAudioBuffers(cloned);
  };

  return (
    <div>
      <StartButton
        superHandleStop={handleRecordStop}
        superHandleStart={handleRecordStart}
      />
      <div>
        <Table size='small'>
          <TableBody>
            {!!audioContextRef.current &&
              audioItems.map((audioItem, index) => (
                <AudioItemRow
                  key={index}
                  duration={audioItem.duration}
                  audioBuffer={audioItem.buffer}
                  audioContext={audioContextRef.current!}
                  handleDelete={() => handleDeleteAudio(index)}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppComponent;
