import React from 'react';
import { Container } from '@mui/material';

import AppComponent from './AppComponent';
import CloudAudioItemTable from './AppComponent/components/CloudAudioItemTable';

function App() {
  return (
    <div style={{ background: '#eee', minHeight: '100vh' }}>
      <Container maxWidth='sm' sx={{ paddingTop: 5 }}>
        <AppComponent assignmentId='002' beatCount={68} />
        <CloudAudioItemTable />
      </Container>
    </div>
  );
}

export default App;
