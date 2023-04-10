import * as yup from 'yup';

export const outcomeValidationSchema = yup.object({
    KIND: yup.string().notOneOf(['default'],'Seleccione una opción válida').required(),
    OUTCOME_KIND: yup.string(),  
    CONCEPT: yup.string().required(),
    QUANTITY: yup.number().required(),
    DATE: yup.date().required(),
    DESCRIPTION: yup.string().required(),
    PAYMENT_METHOD: yup.string().notOneOf(['default'],'Seleccione una opción válida').required(),
});
