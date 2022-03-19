import { Container } from '@mui/material';
import AppComponent from './AppComponent';

function App() {
  return (
    <div style={{ background: '#eee', minHeight: '100vh' }}>
      <Container maxWidth='sm' sx={{ paddingTop: 5 }}>
        <AppComponent />
      </Container>
    </div>
  );
}

export default App;
