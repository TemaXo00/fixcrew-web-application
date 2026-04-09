<script setup lang="ts">
import { ref, reactive } from 'vue'

const formData = reactive({
  name: '',
  phoneNumber: '',
  email: '',
  zip: '',
  message: '',
})

const termsOfService = ref(false)

const errors = reactive<Record<string, string>>({})

const validateForm = () => {
  Object.keys(errors).forEach((key) => delete errors[key])

  const newErrors: Record<string, string> = {}

  if (!formData.name.trim()) newErrors.name = 'Name is required'
  if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
  if (!formData.email.trim()) newErrors.email = 'Email is required'
  if (!formData.zip.trim()) newErrors.zip = 'Zip-code is required'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (formData.email && !emailRegex.test(formData.email)) {
    newErrors.email = 'Invalid email format'
  }

  const phoneRegex = /^(?:\+1[\s\-]?)?\(?[2-9][0-9]{2}\)?[\s\-]?[2-9][0-9]{2}[\s\-]?[0-9]{4}$/
  if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
    newErrors.phoneNumber = 'Invalid phone number. Example: +1 123-456-7890'
  }

  const zipRegex = /^\d{5}(?:-\d{4})?$/
  if (formData.zip && !zipRegex.test(formData.zip)) {
    newErrors.zip = 'Invalid ZIP code. Example: 12345 or 12345-6789'
  }

  if (!termsOfService.value) newErrors.termsOfService = 'You must accept the terms'

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const submitForm = () => {
  if (validateForm()) {
    console.log('Form submitted', formData)
  }
}
</script>

<template>
  <div class="bg-[url(@/assets/images/form-bg.jpg)] bg-cover bg-center min-h-screen rounded-2xl">
    <div class="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <form
        @submit.prevent="submitForm"
        class="flex flex-col items-center gap-5 p-6 sm:p-8 md:p-10 shadow-lg bg-[#E7E7E7] rounded-2xl w-full"
      >
        <div class="text-center max-w-2xl">
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-sans mb-8 sm:mb-10 md:mb-14 text-[#626262]"
          >
            Feel free to contact us 24/7
          </h2>
        </div>
        <div class="flex flex-col sm:flex-row gap-5 w-full max-w-2xl">
          <div class="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Name*"
              v-model="formData.name"
              class="w-full border-2 bg-white border-[#EAEAEA] pt-5 p-5 resize-none hover:border-gray-500 rounded-2xl"
            />
            <span v-if="errors.name" class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
              errors.name
            }}</span>
          </div>
          <div class="relative flex-1 w-full">
            <input
              type="tel"
              placeholder="Phone*"
              v-model="formData.phoneNumber"
              class="w-full border-2 bg-white border-[#EAEAEA] pt-5 p-5 resize-none hover:border-gray-500 rounded-2xl"
            />
            <span
              v-if="errors.phoneNumber"
              class="absolute text-red-500 text-xs bottom-[-18px] left-2"
              >{{ errors.phoneNumber }}</span
            >
          </div>
        </div>
        <div class="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Zip*"
            v-model="formData.zip"
            class="w-full border-2 bg-white border-[#EAEAEA] pt-5 p-5 resize-none hover:border-gray-500 rounded-2xl"
          />
          <span v-if="errors.zip" class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
            errors.zip
          }}</span>
        </div>
        <div class="relative w-full max-w-2xl">
          <textarea
            placeholder="Message"
            v-model="formData.message"
            class="w-full h-60 border-2 bg-white border-[#EAEAEA] pt-5 p-5 resize-none hover:border-gray-500 rounded-2xl"
          ></textarea>
        </div>
        <div class="flex flex-col items-start gap-3 w-full max-w-2xl">
          <div class="flex w-full">
            <div class="flex gap-3 items-start relative w-full">
              <input
                type="checkbox"
                v-model="termsOfService"
                class="border-[#EAEAEA] w-[24px] h-[24px] flex-shrink-0 mt-1"
              />
              <div class="text-gray-500 font-sans text-left break-words flex-1">
                By checking this box, I consent to receive marketing and promotional text messages
                from FixCrew LLC at the phone number I have provided above. Message and data rates
                may apply. Message frequency varies. Reply HELP for help and STOP to stop. I consent
                to the
                <a
                  href="https://client.housecallpro.com/marketing/terms"
                  class="text-blue-600 underline whitespace-nowrap"
                  >Terms of Service</a
                >
                and
                <a
                  href="https://client.housecallpro.com/marketing/privacy"
                  class="text-blue-600 underline whitespace-nowrap"
                  >Privacy Policy</a
                >.
              </div>
            </div>
          </div>
          <span v-if="errors.termsOfService" class="text-red-500 text-xs">{{
            errors.termsOfService
          }}</span>
        </div>
        <button
          type="submit"
          class="mb-4 mt-10 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
        >
          Book now
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
