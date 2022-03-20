import { Button } from '@mui/material';
import React from 'react';

const SetupButtonPane = ({ handleSetup }: { handleSetup: () => void }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div style={{ height: 120 }}>
      <Button color='primary' onClick={handleSetup} variant='outlined'>
        こんにちは
      </Button>
    </div>
  </div>
);

export default SetupButtonPane;
