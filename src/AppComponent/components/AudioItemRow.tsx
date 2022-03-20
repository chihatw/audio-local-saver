import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { useMemo, useState } from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';

import { Player } from '../classes/Player';

const AudioItemRow = ({
  bpm,
  dataURI,
  miliSeconds,
  audioContext,
  handleDelete,
}: {
  bpm: number;
  dataURI: string;
  miliSeconds: number;
  audioContext: AudioContext;
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
      player.audioContext = audioContext;
      player.dataURI = dataURI;
      player.handleOnEnd = handleOnEnd;
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <TableRow>
      <TableCell>{getDate(miliSeconds)}</TableCell>
      <TableCell>{bpm}</TableCell>
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

const getDate = (miliSeconds: number) => {
  const date = new Date(miliSeconds);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours());
  const minuts = String(date.getMinutes());
  const seconds = String(date.getSeconds());
  return `${month}月${day}日 ${hours.padStart(2, '0')}:${minuts.padStart(
    2,
    '0'
  )}:${seconds.padStart(2, '0')}`;
};
