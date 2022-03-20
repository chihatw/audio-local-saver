import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

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
}) => {
  if (!!audioItems.length) {
    return (
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>date</TableCell>
            <TableCell>bpm</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {audioItems.map((audioItem, index) => (
            <AudioItemRow
              key={index}
              audioItem={audioItem}
              audioContext={audioContext}
              handleDelete={() => deleteAudio(index)}
            />
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <></>;
  }
};

export default AudioItemTable;
