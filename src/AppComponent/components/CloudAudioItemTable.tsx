import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';

import useAudioItems from '../services/useAudioItems';
import CloudAudioItemRow from './CloudAudioItemRow';

const CloudAudioItemTable = () => {
  const { audioItems } = useAudioItems();
  return (
    <div style={{ paddingTop: 20, display: 'grid', rowGap: 20 }}>
      <div>firestore</div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>workoutId</TableCell>
            <TableCell>dateId</TableCell>
            <TableCell>date</TableCell>
            <TableCell>bpm</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {audioItems.map((audioItem, index) => (
            <CloudAudioItemRow key={index} audioItem={audioItem} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CloudAudioItemTable;
