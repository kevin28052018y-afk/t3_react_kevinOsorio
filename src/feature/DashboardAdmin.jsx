import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Container, Typography, Button } from '@mui/material';

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const sesion = JSON.parse(localStorage.getItem('sesion') || 'null');

  const salir = () => {
    localStorage.removeItem('sesion');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#0F2E1D' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Gol de Barrio · Administrador
          </Typography>
          <Button color="inherit" onClick={salir}>Salir</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ bgcolor: '#F4F7F2', minHeight: '100vh', py: 5 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Hola, {sesion?.nombre}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Aquí irá la gestión del torneo: equipos, partidos, resultados y tabla.
          </Typography>
        </Container>
      </Box>
    </>
  );
}