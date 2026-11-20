import {
  AppBar, Toolbar, Box, Container, Typography, Button, Stack,
  Table, TableBody, TableCell, TableHead, TableRow,
  Divider, CssBaseline, ThemeProvider, createTheme,
} from '@mui/material';
import SeccionInscripcion from './InscripcionEquipo.jsx';

// Paleta: césped, franja de corte, tiza, tarjeta amarilla, tarjeta roja
const C = {
  turf: '#1E5B3A',
  turfLight: '#236840',
  night: '#0F2E1D',
  chalk: '#F4F7F2',
  yellow: '#F6C945',
  red: '#D7263D',
};

const theme = createTheme({
  palette: {
    primary: { main: C.yellow, contrastText: C.night },
    secondary: { main: C.red },
    text: { primary: C.night },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
  },
  shape: { borderRadius: 4 },
});

const partidos = [
  { dia: 'Sáb 21 nov', hora: '4:00 p. m.', local: 'Los Cóndores', visita: 'Barrio Unido', cancha: 'Cancha 1' },
  { dia: 'Sáb 21 nov', hora: '6:00 p. m.', local: 'Deportivo Sur', visita: 'La Escuadra', cancha: 'Cancha 2' },
  { dia: 'Dom 22 nov', hora: '10:00 a. m.', local: 'Real Esquina', visita: 'Los Cóndores', cancha: 'Cancha 1' },
  { dia: 'Dom 22 nov', hora: '12:00 m.', local: 'Barrio Unido', visita: 'Deportivo Sur', cancha: 'Cancha 2' },
];

const tabla = [
  { equipo: 'Los Cóndores', pj: 6, g: 5, e: 0, p: 1, pts: 15 },
  { equipo: 'Deportivo Sur', pj: 6, g: 4, e: 1, p: 1, pts: 13 },
  { equipo: 'Barrio Unido', pj: 6, g: 2, e: 2, p: 2, pts: 8 },
  { equipo: 'La Escuadra', pj: 6, g: 1, e: 2, p: 3, pts: 5 },
  { equipo: 'Real Esquina', pj: 6, g: 0, e: 1, p: 5, pts: 1 },
];

// Cancha dibujada con líneas de tiza y una jugada en amarillo
function Cancha() {
  const line = { stroke: '#F4F7F2', strokeWidth: 2, fill: 'none' };
  return (
    <svg viewBox="0 0 400 260" role="img" aria-label="Cancha de fútbol con una jugada hacia el arco" style={{ width: '100%', height: 'auto' }}>
      <rect x="10" y="10" width="380" height="240" {...line} />
      <line x1="200" y1="10" x2="200" y2="250" {...line} />
      <circle cx="200" cy="130" r="34" {...line} />
      <rect x="10" y="70" width="62" height="120" {...line} />
      <rect x="328" y="70" width="62" height="120" {...line} />
      <rect x="10" y="102" width="24" height="56" {...line} />
      <rect x="366" y="102" width="24" height="56" {...line} />
      <path d="M110 200 Q170 150 230 150 T340 128" stroke={C.yellow} strokeWidth="3" strokeDasharray="7 7" fill="none" />
      <circle cx="110" cy="200" r="7" fill={C.yellow} />
      <circle cx="230" cy="150" r="7" fill={C.yellow} />
      <circle cx="345" cy="128" r="6" fill="#fff" stroke={C.night} strokeWidth="2" />
    </svg>
  );
}

export default function LandingFutbol() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="sticky" elevation={0} sx={{ bgcolor: C.night }}>
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: '#fff' }}>
            Gol de Barrio
          </Typography>
          <Button href="#partidos" sx={{ color: '#fff', display: { xs: 'none', sm: 'inline-flex' } }}>Partidos</Button>
          <Button href="#tabla" sx={{ color: '#fff', display: { xs: 'none', sm: 'inline-flex' } }}>Tabla</Button>
          <Button href="#inscripcion" variant="contained" sx={{ ml: 1 }}>Inscribir equipo</Button>
          {/* Ajusta la ruta según tu router (antes: "login.jsx") */}
          <Button href="/login" variant="contained" sx={{ ml: 1 }}>Ingresar</Button>
        </Toolbar>
      </AppBar>

      {/* Hero: césped con franjas de corte */}
      <Box
        sx={{
          color: '#fff',
          py: { xs: 6, md: 10 },
          background: `repeating-linear-gradient(90deg, ${C.turf} 0 90px, ${C.turfLight} 90px 180px)`,
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'grid', gap: 5, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Box>
            <Typography variant="h1" sx={{ fontSize: { xs: '3.2rem', md: '5.2rem' } }}>
              Tu equipo juega este fin de semana.
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: 460, fontSize: '1.15rem', opacity: 0.92 }}>
              Torneo de fútbol 7 con árbitros, tabla en vivo y partidos todos los sábados y domingos.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <Button href="#inscripcion" variant="contained" size="large">Inscribir equipo</Button>
              <Button href="#partidos" size="large" sx={{ color: '#fff', border: '2px solid #fff' }}>Ver partidos</Button>
            </Stack>
          </Box>
          <Cancha />
        </Container>
      </Box>

      {/* Partidos y tabla */}
      <Box sx={{ bgcolor: C.chalk, py: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg" sx={{ display: 'grid', gap: 7, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Box id="partidos">
            <Typography variant="h2" sx={{ fontSize: '2.2rem', mb: 2 }}>Próximos partidos</Typography>
            {partidos.map((p, i) => (
              <Box key={i}>
                <Box sx={{ py: 2, display: 'grid', gridTemplateColumns: '110px 1fr', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{p.dia}</Typography>
                    <Typography variant="body2">{p.hora}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                      {p.local} vs {p.visita}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>{p.cancha}</Typography>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>

          <Box id="tabla">
            <Typography variant="h2" sx={{ fontSize: '2.2rem', mb: 2 }}>Tabla de posiciones</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Equipo</TableCell>
                  <TableCell align="right">PJ</TableCell>
                  <TableCell align="right">G</TableCell>
                  <TableCell align="right">E</TableCell>
                  <TableCell align="right">P</TableCell>
                  <TableCell align="right">Pts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tabla.map((t, i) => (
                  <TableRow key={t.equipo} sx={i === 0 ? { bgcolor: C.yellow } : undefined}>
                    <TableCell sx={{ fontWeight: i === 0 ? 700 : 400 }}>{t.equipo}</TableCell>
                    <TableCell align="right">{t.pj}</TableCell>
                    <TableCell align="right">{t.g}</TableCell>
                    <TableCell align="right">{t.e}</TableCell>
                    <TableCell align="right">{t.p}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>{t.pts}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Container>
      </Box>

      {/* Inscripción / registro */}
      <SeccionInscripcion C={C} />

      <Box sx={{ bgcolor: C.night, color: '#fff', py: 4, textAlign: 'center' }}>
        <Typography variant="body2">Gol de Barrio · Torneo de fútbol 7</Typography>
      </Box>
    </ThemeProvider>
  );
}