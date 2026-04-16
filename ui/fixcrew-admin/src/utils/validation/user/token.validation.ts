import * as yup from 'yup'

export const tokenValidation = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
})
