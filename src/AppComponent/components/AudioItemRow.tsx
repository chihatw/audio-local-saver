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
}: {
  dataURI: string;
  duration: number;
  audioContextRef: React.MutableRefObject<AudioContext | null>;
  handleDelete: () => void;
}) => {
  const player = useMemo(() => new Player(), []);
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
