import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
})

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  surname: yup
    .string()
    .min(3, 'Surname must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Surname is required'),
  phone_number: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be xxx-xxx-xxxx'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .required('Password is required'),
})

export const restoreSendSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
})

export const restoreSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .required('Password is required'),
})
