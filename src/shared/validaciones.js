// Cada función devuelve '' si el valor es válido, o el mensaje de error.

export const validarCorreo = (valor) => {
  const v = valor.trim();
  if (!v) return 'Escribe tu correo.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Escribe un correo válido.';
  return '';
};

// En el login solo se exige que no esté vacía
export const validarPasswordLogin = (valor) =>
  valor ? '' : 'Escribe tu contraseña.';

// Para crear una contraseña nueva (registro / restablecer)
export const validarPasswordNueva = (valor) => {
  if (!valor) return 'Crea una contraseña.';
  if (valor.length < 8) return 'Mínimo 8 caracteres.';
  if (!/[A-Za-z]/.test(valor) || !/\d/.test(valor)) return 'Debe incluir letras y números.';
  return '';
};

export const validarConfirmacion = (password, confirmacion) => {
  if (!confirmacion) return 'Confirma tu contraseña.';
  if (password !== confirmacion) return 'Las contraseñas no coinciden.';
  return '';
};

export const validarNombre = (valor, etiqueta = 'nombre') => {
  const v = valor.trim();
  if (!v) return `Escribe el ${etiqueta}.`;
  if (v.length < 3) return 'Mínimo 3 caracteres.';
  if (v.length > 40) return 'Máximo 40 caracteres.';
  if (!/^[\p{L}\s'.-]+$/u.test(v)) return 'Solo letras y espacios.';
  return '';
};

export const validarEquipo = (valor) => {
  const v = valor.trim();
  if (!v) return 'Escribe el nombre del equipo.';
  if (v.length < 3) return 'Mínimo 3 caracteres.';
  if (v.length > 30) return 'Máximo 30 caracteres.';
  return '';
};