import * as yup from 'yup'

export const createCategorySchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters')
    .max(70, 'Max length must be less than 70 characters'),
  type_id: yup.string().uuid('Invalid type ID').required('Type is required'),
})

export const updateCategoryNameSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters')
    .max(70, 'Max length must be less than 70 characters'),
})

export const updateCategoryTypeSchema = yup.object({
  type_id: yup.string().uuid('Invalid type ID').required('Type is required'),
})
