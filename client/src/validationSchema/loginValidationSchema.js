import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  USER: yup.string().email('El email no cumple con el formato de correo electrónico').required('El email es un campo obligatorio'),
  PASSWORD: yup.string().required('La contraseña es un campo obligatorio')
});
