import * as yup from 'yup'

export const uploadFileSchema = yup.object({
  file: yup
    .mixed<File>()
    .required('File is required')
    .test('fileType', 'Only image files are allowed (JPEG, PNG, GIF, WEBP)', (value) => {
      if (!value) {
        return false
      }
      return value.type.startsWith('image/')
    })
    .test('fileSize', 'File size must not exceed 5MB', (value) => {
      if (!value) {
        return false
      }
      return value.size <= 5 * 1024 * 1024
    }),
})
