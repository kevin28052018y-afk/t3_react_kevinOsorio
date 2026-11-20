import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Alert,
  Stack,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { C, theme, fondoCesped } from '../shared/tema';
import { validarCorreo, validarPasswordLogin } from '../shared/validaciones';

// Destino según el rol del usuario
const RUTA_POR_ROL = {
  admin: '/admin',
  capitan: '/capitan',
};

// TEMPORAL: reemplaza esta función por tu llamada real (API / Firebase / Supabase).
// Debe devolver { nombre, rol } donde el rol lo decide el SERVIDOR, no el navegador.
async function autenticar(correo, password) {
  if (!correo || !password) throw new Error('Credenciales inválidas');
  return {
    nombre: correo.split('@')[0],
    correo,
    rol: correo.toLowerCase().startsWith('admin') ? 'admin' : 'capitan',
  };
}

export default function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errores, setErrores] = useState({ correo: '', password: '' });
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);

  const validarTodo = () => {
    const nuevos = {
      correo: validarCorreo(correo),
      password: validarPasswordLogin(password),
    };
    setErrores(nuevos);
    return !nuevos.correo && !nuevos.password;
  };

  const ingresar = async (e) => {
    e.preventDefault();
    setErrorGeneral('');
    if (!validarTodo()) return;

    setCargando(true);
    try {
      const usuario = await autenticar(correo.trim(), password);

      const destino = RUTA_POR_ROL[usuario.rol];
      if (!destino) {
        setErrorGeneral('Tu cuenta no tiene acceso al panel.');
        return;
      }

      localStorage.setItem('sesion', JSON.stringify(usuario));
      navigate(destino, { replace: true });
    } catch (err) {
      // Mensaje genérico: no revela si el correo existe o no
      setErrorGeneral('Correo o contraseña incorrectos.');
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
              Ingresar
            </Typography>
            <Typography sx={{ mt: 1, mb: 3 }}>
              Accede a Gol de Barrio como capitán o administrador.
            </Typography>

            <Stack component="form" noValidate onSubmit={ingresar} spacing={2}>
              {errorGeneral && <Alert severity="error">{errorGeneral}</Alert>}

              <TextField
                label="Correo electrónico"
                type="email"
                autoComplete="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                onBlur={() => setErrores((p) => ({ ...p, correo: validarCorreo(correo) }))}
                error={!!errores.correo}
                helperText={errores.correo}
                sx={{ bgcolor: '#fff' }}
              />

              <TextField
                label="Contraseña"
                type={mostrarPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setErrores((p) => ({ ...p, password: validarPasswordLogin(password) }))}
                error={!!errores.password}
                helperText={errores.password}
                sx={{ bgcolor: '#fff' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                        edge="end"
                      >
                        {mostrarPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography variant="body2" sx={{ textAlign: 'right' }}>
                <Link component={RouterLink} to="/recuperar" underline="always" color="inherit">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Typography>

              <Button
                type="submit"
                size="large"
                variant="contained"
                disabled={cargando}
                sx={{ bgcolor: C.night, color: '#fff', '&:hover': { bgcolor: C.turf } }}
              >
                {cargando ? 'Ingresando...' : 'Ingresar'}
              </Button>

              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                ¿No tienes cuenta?{' '}
                <Link href="/#inscripcion" underline="always" color="inherit" sx={{ fontWeight: 700 }}>
                  Inscríbete aquí
                </Link>
              </Typography>

              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/" underline="hover" color="inherit">
                  ← Volver al inicio
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}