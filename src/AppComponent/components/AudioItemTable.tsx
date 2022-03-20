import React from 'react';
import { Table, TableBody } from '@mui/material';

import AudioItemRow from './AudioItemRow';
import { AudioItem } from '..';

const AudioItemTable = ({
  audioItems,
  audioContextRef,
  deleteAudio,
  setErrMsg,
}: {
  audioItems: AudioItem[];
  audioContextRef: React.MutableRefObject<AudioContext | null>;
  deleteAudio: (index: number) => void;
  setErrMsg: (value: string) => void;
}) => (
  <Table size='small'>
    <TableBody>
      {audioItems.map((audioItem, index) => (
        <AudioItemRow
          key={index}
          dataURI={audioItem.dataURI}
          duration={audioItem.duration}
          audioContextRef={audioContextRef}
          handleDelete={() => deleteAudio(index)}
          setErrMsg={setErrMsg}
        />
      ))}
    </TableBody>
  </Table>
);

export default AudioItemTable;
