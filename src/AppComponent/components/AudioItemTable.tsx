import React from 'react';
import { Table, TableBody } from '@mui/material';

import AudioItemRow from './AudioItemRow';
import { AudioItem } from '..';

const AudioItemTable = ({
  audioItems,
  audioContext,
  deleteAudio,
}: {
  audioItems: AudioItem[];
  audioContext: AudioContext;
  deleteAudio: (index: number) => void;
}) => (
  <Table size='small'>
    <TableBody>
      {audioItems.map((audioItem, index) => (
        <AudioItemRow
          key={index}
          dataURI={audioItem.dataURI}
          duration={audioItem.duration}
          audioContext={audioContext}
          handleDelete={() => deleteAudio(index)}
        />
      ))}
    </TableBody>
  </Table>
);

export default AudioItemTable;
