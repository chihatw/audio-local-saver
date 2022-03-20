import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import { Button, IconButton } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { Player } from '../classes/Player';
import { AudioItem } from '..';
import useAudioItems from '../services/useAudioItems';

const CheckPane = ({
  audioItem,
  audioContext,
  deleteAudio,
  setIsChecking,
  updateLastAudioItem,
}: {
  audioItem: AudioItem;
  audioContext: AudioContext;
  deleteAudio: () => void;
  setIsChecking: (value: boolean) => void;
  updateLastAudioItem: (value: AudioItem) => void;
}) => {
  const { addAudioItem } = useAudioItems();

  const player = useMemo(() => new Player(), []);

  const [isPlayed, setIsPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnEnd = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (isPlaying) {
      player.stop();
    } else {
      player.audioContext = audioContext;
      player.dataURI = audioItem.dataURI;
      player.handleOnEnd = handleOnEnd;
      player.play();
      setIsPlayed(true);
    }
    setIsPlaying(!isPlaying);
  };

  const saveAudioItem = (isPerfect: boolean) => {
    setIsPlayed(false);
    setIsChecking(false);

    const cloned = { ...audioItem };
    // きれいじゃない場合、audioItemの isPerfect を更新する
    if (!isPerfect) {
      cloned.isPerfect = false;
      updateLastAudioItem(cloned);
    }
    // fireStoreへ保存
    addAudioItem(cloned);
  };

  const deleteAudioItem = () => {
    deleteAudio();
    setIsChecking(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.85)',
      }}
    >
      <div style={{ display: 'grid', rowGap: 8 }}>
        <div style={{ textAlign: 'center', fontSize: 48 }}>{audioItem.bpm}</div>
        <div style={{ textAlign: 'center' }}>録音を確認してください</div>
        <IconButton onClick={handlePlay} color='primary'>
          {isPlaying ? (
            <StopCircleRoundedIcon sx={{ fontSize: 120 }} />
          ) : (
            <PlayCircleRoundedIcon sx={{ fontSize: 120 }} />
          )}
        </IconButton>

        <div style={{ display: 'grid', rowGap: 16, height: 165 }}>
          {isPlayed && (
            <>
              <Button
                onClick={() => saveAudioItem(true)}
                variant='contained'
                size='small'
              >
                上手に読めた
              </Button>
              <Button onClick={() => saveAudioItem(false)} variant='contained'>
                よくわからない
              </Button>
              <Button onClick={deleteAudioItem} variant='outlined'>
                この録音は削除
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckPane;
