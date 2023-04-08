import * as yup from 'yup';

export const editProductValidationSchema = yup.object({
    CALORIAS: yup.number().required(),
    COSTO_PRODUCCION: yup.number().required(),
    PRECIO_VENTA:yup.number().required(),
    DESCRIPCION: yup.string().required(),
    DISPONIBILIDAD: yup.bool()
});

export const productValidationSchema = yup.object({
    NOMBRE: yup.string().required(),
    CATEGORIA: yup.string().notOneOf(['default']).required(),
    CALORIAS: yup.number().required(),
    COSTO_PRODUCCION: yup.number().required(),
    PRECIO_VENTA:yup.number().required(),
    DESCRIPCION: yup.string().required(),
    DISPONIBILIDAD: yup.bool()
});
