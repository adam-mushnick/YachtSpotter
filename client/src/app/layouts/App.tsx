import Header from './Header';
import { Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{ p: 0 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
