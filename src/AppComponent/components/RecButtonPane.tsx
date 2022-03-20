import React, { useMemo } from 'react';

import StartButton from './StartButton';
import { Recorder } from '../classes/Recorder';
import { AudioItem } from '..';
import blob2AudioBuffer from '../services/blob2AudioBuffer';

const RecButtonPane = ({
  beatCount,
  assignmentId,
  audioContext,
  pushAudioItem,
  handleStartChecking,
}: {
  beatCount: number;
  assignmentId: string;
  audioContext: AudioContext;
  pushAudioItem: (audioItems: AudioItem) => void;
  handleStartChecking: () => void;
}) => {
  const recorder = useMemo(() => new Recorder(), []);

  const handleOnDataAvailable = async (event: BlobEvent) => {
    const blob = event.data;
    const audioBuffer = await blob2AudioBuffer({
      data: blob,
      audioContext: audioContext,
    });

    if (audioBuffer) {
      // blob（バイナリー）を dataURI（文字列）に変更
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!!event.target) {
          const dataURI = event.target.result as string;
          const bpm = calcBpm({ beatCount, seconds: audioBuffer.duration });
          const item: AudioItem = {
            id: String(Date.now()),
            bpm,
            dataURI,
            assignmentId,
          };
          handleStartChecking();
          pushAudioItem(item);
        }
      };
      reader.readAsDataURL(blob);
    }
  };

  const handleRecordStart = () => {
    recorder.audioContext = audioContext;
    recorder.handleOnDataAvailable = handleOnDataAvailable;
    recorder.start();
  };

  const handleRecordStop = () => {
    if (!recorder) return;
    recorder.stop();
  };
  return (
    <StartButton
      superHandleStop={handleRecordStop}
      superHandleStart={handleRecordStart}
    />
  );
};

export default RecButtonPane;

const calcBpm = ({
  seconds,
  beatCount,
}: {
  seconds: number;
  beatCount: number;
}) => {
  return Math.floor((beatCount * 60) / seconds);
};
