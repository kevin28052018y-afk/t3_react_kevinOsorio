import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Alert,
  Stack,
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  validarCorreo,
  validarNombre,
  validarEquipo,
  validarPasswordNueva,
  validarConfirmacion,
} from '../shared/validaciones';

const ERRORES_VACIOS = { equipo: '', nombre: '', correo: '', password: '', confirmacion: '' };

export default function InscripcionEquipo({ C }) {
  // Estados del formulario
  const [rol, setRol] = useState('capitan');
  const [nombre, setNombre] = useState('');
  const [equipo, setEquipo] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmacion, setConfirmacion] = useState('');

  // Estados de control de interfaz
  const [errores, setErrores] = useState(ERRORES_VACIOS);
  const [errorGeneral, setErrorGeneral] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const esCapitan = rol === 'capitan';

  const campo = (nombreCampo, mensaje) =>
    setErrores((prev) => ({ ...prev, [nombreCampo]: mensaje }));

  const validarTodo = () => {
    const nuevos = {
      equipo: esCapitan ? validarEquipo(equipo) : '',
      nombre: validarNombre(nombre, esCapitan ? 'nombre del capitán' : 'nombre del administrador'),
      correo: validarCorreo(correo),
      password: validarPasswordNueva(password),
      confirmacion: validarConfirmacion(password, confirmacion),
    };
    setErrores(nuevos);
    return Object.values(nuevos).every((m) => !m);
  };

  const inscribir = async (e) => {
    e.preventDefault();
    setErrorGeneral('');
    if (!validarTodo()) return;

    // Nunca se imprime la contraseña
    const datosRegistro = {
      rol,
      nombre: nombre.trim(),
      correo: correo.trim(),
      ...(esCapitan && { equipo: equipo.trim() }),
    };

    setCargando(true);
    try {
      console.log('Datos enviados:', datosRegistro);
      // Aquí iría tu llamada a la API / Firebase / Supabase (con password)
      setEnviado(true);
    } catch (err) {
      setErrorGeneral('No pudimos completar el registro. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const cambiarRol = (nuevoRol) => {
    setRol(nuevoRol);
    setErrores(ERRORES_VACIOS);
  };

  const botonVer = (
    <InputAdornment position="end">
      <IconButton
        aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        onClick={() => setMostrarPassword(!mostrarPassword)}
        edge="end"
      >
        {mostrarPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box id="inscripcion" sx={{ bgcolor: C.yellow, py: { xs: 6, md: 9 } }}>
      <Container maxWidth="sm">
        <Typography variant="h2" sx={{ fontSize: '2.4rem' }}>
          {esCapitan ? 'Inscribe a tu equipo' : 'Registro de Administrador'}
        </Typography>

        <Typography sx={{ mt: 1, mb: 3 }}>
          {esCapitan
            ? 'Cupos limitados a 8 equipos por categoría.'
            : 'Acceso exclusivo para la gestión y organización del torneo.'}
        </Typography>

        {enviado ? (
          <Alert severity="success" sx={{ fontSize: '1rem' }}>
            {esCapitan
              ? `Listo, ${equipo.trim()} quedó inscrito. Te escribiremos a ${correo.trim()}, ${nombre.trim()}, con el calendario.`
              : `Cuenta de administrador creada para ${nombre.trim()}. Te enviamos los accesos a ${correo.trim()}.`}
          </Alert>
        ) : (
          <Stack component="form" noValidate onSubmit={inscribir} spacing={2}>
            <Alert severity="info">
              Registro exclusivo para <strong>Capitanes</strong> y <strong>Administradores</strong>.
              Los jugadores no tienen acceso de registro.
            </Alert>

            {errorGeneral && <Alert severity="error">{errorGeneral}</Alert>}

            <TextField
              select
              label="Rol en el torneo"
              value={rol}
              onChange={(e) => cambiarRol(e.target.value)}
              sx={{ bgcolor: '#fff' }}
            >
              <MenuItem value="capitan">Capitán de equipo</MenuItem>
              <MenuItem value="admin">Administrador del torneo</MenuItem>
            </TextField>

            {esCapitan && (
              <TextField
                label="Nombre del equipo"
                value={equipo}
                onChange={(e) => setEquipo(e.target.value)}
                onBlur={() => campo('equipo', validarEquipo(equipo))}
                error={!!errores.equipo}
                helperText={errores.equipo}
                sx={{ bgcolor: '#fff' }}
              />
            )}

            <TextField
              label={esCapitan ? 'Nombre del capitán' : 'Nombre del administrador'}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={() =>
                campo('nombre', validarNombre(nombre, esCapitan ? 'nombre del capitán' : 'nombre del administrador'))
              }
              error={!!errores.nombre}
              helperText={errores.nombre}
              sx={{ bgcolor: '#fff' }}
            />

            <TextField
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              onBlur={() => campo('correo', validarCorreo(correo))}
              error={!!errores.correo}
              helperText={errores.correo}
              sx={{ bgcolor: '#fff' }}
            />

            <TextField
              label="Contraseña"
              type={mostrarPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => campo('password', validarPasswordNueva(password))}
              error={!!errores.password}
              helperText={errores.password || 'Mínimo 8 caracteres, con letras y números'}
              sx={{ bgcolor: '#fff' }}
              InputProps={{ endAdornment: botonVer }}
            />

            <TextField
              label="Confirmar contraseña"
              type={mostrarPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmacion}
              onChange={(e) => setConfirmacion(e.target.value)}
              onBlur={() => campo('confirmacion', validarConfirmacion(password, confirmacion))}
              error={!!errores.confirmacion}
              helperText={errores.confirmacion}
              sx={{ bgcolor: '#fff' }}
            />

            <Button
              type="submit"
              size="large"
              variant="contained"
              disabled={cargando}
              sx={{ bgcolor: C.night, color: '#fff', '&:hover': { bgcolor: C.turf } }}
            >
              {cargando ? 'Enviando...' : esCapitan ? 'Inscribir equipo' : 'Registrar administrador'}
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}