import { Container } from '@mui/material';
import { useEffect } from 'react';
import AppComponent from './AppComponent';
import { db } from './repositories/firebase';

function App() {
  return (
    <div style={{ background: '#eee', minHeight: '100vh' }}>
      <Container maxWidth='sm' sx={{ paddingTop: 5 }}>
        <AppComponent assignmentId='002' beatCount={68} />
      </Container>
    </div>
  );
}

export default App;
