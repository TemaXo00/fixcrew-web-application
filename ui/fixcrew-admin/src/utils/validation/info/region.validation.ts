import * as yup from 'yup'

export const createRegionSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters')
    .max(70, 'Max length must be less than 70 characters'),

  avg_response: yup
    .number()
    .typeError('Avg response must be a number')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .integer('Avg response must be an integer')
    .required('Avg response is required')
    .min(1, 'Average response minimum is 1 minute')
    .max(1440, 'Average response maximum is 1 day (1440 minutes)'),
})

export const updateRegionSchema = yup.object({
  avg_response: yup
    .number()
    .typeError('Avg response must be a number')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .integer('Avg response must be an integer')
    .required('Avg response is required')
    .min(1, 'Average response minimum is 1 minute')
    .max(1440, 'Average response maximum is 1 day (1440 minutes)'),
})
