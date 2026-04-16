import * as yup from 'yup'

export const createServiceSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters')
    .max(70, 'Max length must be less than 70 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(15, 'Description must be at least 15 characters'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(0, 'Price cannot be negative'),
  sale_percent: yup
    .number()
    .typeError('Sale percent must be a number')
    .min(0, 'Sale percent cannot be negative')
    .max(100, 'Sale percent cannot exceed 100')
    .optional(),
  avg_time: yup
    .number()
    .typeError('Average time must be a number')
    .min(0, 'Average time cannot be negative')
    .optional(),
  category_id: yup.string().uuid('Invalid category ID').required('Category is required'),
})

export const updateServicePriceSchema = yup.object({
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(0, 'Price cannot be negative'),
})

export const updateServiceNameSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name should be at least 3 characters')
    .max(70, 'Max length must be less than 70 characters'),
})

export const updateServiceDescriptionSchema = yup.object({
  description: yup
    .string()
    .required('Description is required')
    .min(15, 'Description must be at least 15 characters'),
})

export const updateServiceSalePercentSchema = yup.object({
  sale_percent: yup
    .number()
    .typeError('Sale percent must be a number')
    .required('Sale percent is required')
    .min(0, 'Sale percent cannot be negative')
    .max(100, 'Sale percent cannot exceed 100'),
})

export const updateServiceCategorySchema = yup.object({
  category_id: yup.string().uuid('Invalid category ID').required('Category is required'),
})
