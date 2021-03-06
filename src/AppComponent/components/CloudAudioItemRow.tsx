import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React, { useMemo, useState } from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';

import useAudioItems from '../services/useAudioItems';
import getDate from '../services/getData';
import { Player } from '../classes/Player';
import { AudioItem } from '..';

const CloudAudioItemRow = ({ audioItem }: { audioItem: AudioItem }) => {
  const { deleteAudioItem } = useAudioItems();
  const player = useMemo(() => new Player(), []);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnEnd = () => {
    setIsPlaying(false);
  };

  const handleClick = () => {
    if (isPlaying) {
      player.stop();
    } else {
      player.audioContext = new AudioContext();
      player.dataURI = audioItem.dataURI;
      player.handleOnEnd = handleOnEnd;
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDelete = () => {
    deleteAudioItem(audioItem.id);
  };

  return (
    <TableRow>
      <TableCell>{audioItem.workoutId}</TableCell>
      <TableCell>{audioItem.dateId}</TableCell>
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

export default CloudAudioItemRow;
