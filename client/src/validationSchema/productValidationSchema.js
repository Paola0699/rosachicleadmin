import * as yup from 'yup';

export const productValidationSchema = yup.object({
    CALORIAS: yup.number().required(),
    COSTO_PRODUCCION: yup.number().required(),
    PRECIO_VENTA:yup.number().required(),
    DESCRIPCION: yup.string().required(),
    DISPONIBILIDAD: yup.bool()
});
