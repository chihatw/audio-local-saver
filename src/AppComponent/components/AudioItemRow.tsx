import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { useMemo, useState } from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';

import { Player } from '../classes/Player';

const AudioItemRow = ({
  duration,
  audioBuffer,
  audioContext,
  handleDelete,
}: {
  duration: number;
  audioBuffer: AudioBuffer;
  audioContext: AudioContext;
  handleDelete: () => void;
}) => {
  const player = useMemo(() => new Player(), []);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (isPlaying) {
      player.stop();
    } else {
      player.audioContext = audioContext;
      player.audioBuffer = audioBuffer;
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
