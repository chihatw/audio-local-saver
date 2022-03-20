import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { useMemo, useState } from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';

import getDate from '../services/getData';
import { Player } from '../classes/Player';
import { AudioItem } from '..';

const AudioItemRow = ({
  audioItem,
  audioContext,
  handleDelete,
}: {
  audioItem: AudioItem;
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
      player.dataURI = audioItem.dataURI;
      player.handleOnEnd = handleOnEnd;
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <TableRow>
      <TableCell>{getDate(Number(audioItem.id))}</TableCell>
      <TableCell>{audioItem.bpm}</TableCell>
      <TableCell
        sx={{
          width: 32,
          fontSize: audioItem.isPerfect ? 24 : 16,
          textAlign: 'center',
          color: audioItem.isPerfect ? 'green' : 'red',
        }}
      >
        {audioItem.isPerfect ? '○' : '△'}
      </TableCell>
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
