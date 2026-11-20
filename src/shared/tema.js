import { createTheme } from '@mui/material';

// Paleta: césped, franja de corte, tiza, tarjeta amarilla, tarjeta roja
export const C = {
  turf: '#1E5B3A',
  turfLight: '#236840',
  night: '#0F2E1D',
  chalk: '#F4F7F2',
  yellow: '#F6C945',
  red: '#D7263D',
};

export const theme = createTheme({
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

// Fondo de césped con franjas, reutilizable
export const fondoCesped = `repeating-linear-gradient(90deg, ${C.turf} 0 90px, ${C.turfLight} 90px 180px)`;