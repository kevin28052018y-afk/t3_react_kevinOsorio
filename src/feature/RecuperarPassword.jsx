import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Alert,
  Stack,
  TextField,
  Button,
  Link,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { C, theme, fondoCesped } from '../shared/tema';
import { validarCorreo } from '../shared/validaciones';

// TEMPORAL: reemplaza por tu llamada real.
// Con Supabase sería:
//   await supabase.auth.resetPasswordForEmail(correo, {
//     redirectTo: `${window.location.origin}/nueva-password`,
//   });
async function enviarCorreoRecuperacion(correo) {
  console.log('Recuperar contraseña para:', correo);
}

export default function RecuperarPassword() {
  const [correo, setCorreo] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setErrorGeneral('');

    const mensaje = validarCorreo(correo);
    setErrorCorreo(mensaje);
    if (mensaje) return;

    setCargando(true);
    try {
      await enviarCorreoRecuperacion(correo.trim());
      setEnviado(true);
    } catch (err) {
      setErrorGeneral('No pudimos enviar el correo. Inténtalo de nuevo en unos minutos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6, background: fondoCesped }}>
        <Container maxWidth="xs">
          <Box sx={{ bgcolor: C.chalk, p: { xs: 3, sm: 4 }, borderRadius: 1 }}>
            <Typography variant="h2" sx={{ fontSize: '2rem' }}>
              Recuperar contraseña
            </Typography>
            <Typography sx={{ mt: 1, mb: 3 }}>
              Escribe tu correo y te enviaremos un enlace para crear una contraseña nueva.
            </Typography>

            {enviado ? (
              <Stack spacing={2}>
                {/* Mensaje genérico: no revela si el correo está registrado */}
                <Alert severity="success">
                  Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.
                  Revisa también la carpeta de spam.
                </Alert>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  size="large"
                  sx={{ bgcolor: C.night, color: '#fff', '&:hover': { bgcolor: C.turf } }}
                >
                  Volver a ingresar
                </Button>
              </Stack>
            ) : (
              <Stack component="form" noValidate onSubmit={enviar} spacing={2}>
                {errorGeneral && <Alert severity="error">{errorGeneral}</Alert>}

                <TextField
                  label="Correo electrónico"
                  type="email"
                  autoComplete="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  onBlur={() => setErrorCorreo(validarCorreo(correo))}
                  error={!!errorCorreo}
                  helperText={errorCorreo}
                  sx={{ bgcolor: '#fff' }}
                />

                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={cargando}
                  sx={{ bgcolor: C.night, color: '#fff', '&:hover': { bgcolor: C.turf } }}
                >
                  {cargando ? 'Enviando...' : 'Enviar enlace'}
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  <Link component={RouterLink} to="/login" underline="hover" color="inherit">
                    ← Volver a ingresar
                  </Link>
                </Typography>
              </Stack>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}