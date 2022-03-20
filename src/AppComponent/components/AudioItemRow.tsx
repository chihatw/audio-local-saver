import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { useMemo, useState } from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';

import { Player } from '../classes/Player';

const AudioItemRow = ({
  dataURI,
  duration,
  audioContextRef,
  handleDelete,
  setErrMsg,
}: {
  dataURI: string;
  duration: number;
  audioContextRef: React.MutableRefObject<AudioContext | null>;
  handleDelete: () => void;
  setErrMsg: (value: string) => void;
}) => {
  const player = useMemo(() => new Player(setErrMsg), []);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnEnd = () => {
    setIsPlaying(false);
  };

  const handleClick = () => {
    if (isPlaying) {
      player.stop();
    } else {
      let audioContext = audioContextRef.current;
      if (!audioContext) {
        audioContext = new window.AudioContext();

        audioContextRef.current = audioContext;
        // ダミーで音を鳴らす
        try {
          const osc = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          osc.connect(gainNode);
          gainNode.connect(audioContext.destination);
          // gainNode.gain.value = 0;
          osc.start(audioContext.currentTime);
          osc.stop(audioContext.currentTime + 0.03);
        } catch (e) {
          setErrMsg(String(e));
        }
      }
      player.audioContext = audioContext;
      player.dataURI = dataURI;
      player.handleOnEnd = handleOnEnd;
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <TableRow>
      <TableCell>{duration}</TableCell>
      <TableCell sx={{ width: 24 }}>
        <IconButton onClick={handleClick}>
          {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
        </IconButton>
      </TableCell>
      <TableCell sx={{ width: 24 }}>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default AudioItemRow;
