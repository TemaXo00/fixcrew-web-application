import * as yup from 'yup'

export const createTypeSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters')
    .max(70, 'Max length must be less than 70 characters'),
})

export const updateTypeSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters')
    .max(70, 'Max length must be less than 70 characters'),
})
