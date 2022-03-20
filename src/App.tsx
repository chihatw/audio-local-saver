import { Container } from '@mui/material';
import AppComponent from './AppComponent';

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
