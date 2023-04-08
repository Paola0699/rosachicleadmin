import * as yup from 'yup';

export const categoryValidationSchema = yup.object({
    NOMBRE: yup.string().required(),
    DESCRIPCION: yup.string().required(),
    PROVEEDOR_EXTERNO: yup.bool(),
    CATEGORIA_VISIBLE: yup.bool(),
});
export const editCategoryValidationSchema = yup.object({
    DESCRIPCION: yup.string().required(),
    PROVEEDOR_EXTERNO: yup.bool(),
    CATEGORIA_VISIBLE: yup.bool(),
});
