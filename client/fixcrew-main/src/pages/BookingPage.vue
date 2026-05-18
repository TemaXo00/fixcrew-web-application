<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking.store'
import type { Types, TypesCategories, TypesSubCategories } from '@/interfaces/booking.interface.ts'
import { services } from '@/mocks/booking.mock.ts'
import InputContent from '@/components/universalComp/InputContent.vue'
import { internalApi } from '@/api/instances.api'

const router = useRouter()
const bookingStore = useBookingStore()
const {
  step,
  type: selectedService,
  category: selectedCategory,
  subCategory: selectedSubCategory,
  details,
  previewUrls,
  selectedFiles,
  firstName,
  lastName,
  phoneNumber,
  email,
  street,
  house,
  city,
  zip,
  country,
  state,
  checkBox,
} = storeToRefs(bookingStore)

const fileInput = ref<HTMLInputElement | null>(null)
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const submitError = ref('')

// Простые поля для выбора даты и времени
const preferredDate = ref('')
const preferredTime = ref('')

const getFullAddress = () => {
  const parts = [street.value, house.value, city.value, state.value, zip.value, country.value]
  return parts.filter((p) => p && p.trim()).join(', ')
}

const fetchRegionId = async () => {
  // Пока регион можно не запрашивать, если бэкенд не требует, или вернуть заглушку
  // Но для порядка оставим логику
  try {
    const res = await internalApi.get('/regions')
    const regions = res.data
    const match = regions.find(
      (r: any) =>
        r.state?.toLowerCase() === state.value?.toLowerCase() &&
        (r.city ? r.city.toLowerCase() === city.value?.toLowerCase() : true),
    )
    if (match) return match.id
  } catch (err) {
    console.warn('Region fetch failed, using null')
  }
  return null
}

const uploadPhotos = async (files: File[]): Promise<string[]> => {
  if (!files.length) return []
  const formData = new FormData()
  files.forEach((file) => formData.append('photos', file))
  const response = await internalApi.post('/orders/photos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data.photoIds
}

const createOrder = async () => {
  const region = await fetchRegionId()
  const photoIds = await uploadPhotos(selectedFiles.value)
  let finalMessage = details.value || ''
  if (preferredDate.value && preferredTime.value) {
    finalMessage = finalMessage
      ? `${finalMessage}\nPreferred time: ${preferredDate.value} at ${preferredTime.value}`
      : `Preferred time: ${preferredDate.value} at ${preferredTime.value}`
  }
  const orderData = {
    name: `${firstName.value} ${lastName.value}`.trim(),
    phone: phoneNumber.value,
    email: email.value || undefined,
    address: getFullAddress(),
    message: finalMessage || undefined,
    region_id: region,
    photo_ids: photoIds,
  }
  await internalApi.post('/order/orders', orderData)
}

const validateStep6 = () => {
  const newErrors: Record<string, string> = {}

  if (!firstName.value?.trim()) newErrors.firstName = 'Required'
  if (!lastName.value?.trim()) newErrors.lastName = 'Required'
  if (!phoneNumber.value?.trim()) newErrors.phone = 'Required'
  if (!email.value?.trim()) newErrors.email = 'Required'
  if (!city.value?.trim()) newErrors.city = 'Required'
  if (!zip.value?.trim()) newErrors.zip = 'Required'
  if (!state.value?.trim()) newErrors.state = 'Required'
  if (!checkBox.value) newErrors.checkBox = 'Required'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email.value && !emailRegex.test(email.value)) {
    newErrors.email = 'Invalid email'
  }

  const phoneRegex = /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/
  if (phoneNumber.value && !phoneRegex.test(phoneNumber.value)) {
    newErrors.phone =
      'Phone number must be in valid US format (e.g., +1 123-456-7890, 1234567890, (123) 456-7890, 123-456-7890, etc.)'
  }

  const zipRegex = /^\d{5}(?:-\d{4})?$/
  if (zip.value && !zipRegex.test(zip.value)) {
    newErrors.zip = 'Invalid ZIP code. Example: 12345 or 12345-6789'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const proceed = () => {
  if (step.value === 6 && !validateStep6()) return
  bookingStore.setStep(step.value + 1)
}

const goBack = () => {
  if (step.value > 1) bookingStore.setStep(step.value - 1)
}

const submitWithPreferredTime = async () => {
  if (!preferredDate.value || !preferredTime.value) {
    submitError.value = 'Please select both date and time, or use "Skip & Order"'
    return
  }
  await performOrderCreation()
}

const submitWithoutPreferredTime = async () => {
  preferredDate.value = ''
  preferredTime.value = ''
  await performOrderCreation()
}

const performOrderCreation = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  submitError.value = ''
  try {
    await createOrder()
    bookingStore.setStep(8)
  } catch (err: any) {
    submitError.value = err.message || 'Failed to submit order. Please try again.'
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}

const goHome = () => {
  bookingStore.resetStore()
  router.push({ name: 'Home' })
}

const selectService = (service: Types) => {
  bookingStore.setType(service)
  proceed()
}

const selectCategory = (category: TypesCategories) => {
  bookingStore.setCategory(category)
  proceed()
}

const selectSubCategory = (sub: TypesSubCategories) => {
  bookingStore.setSubCategory(sub)
  proceed()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files) {
    const newFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))
    if (newFiles.length !== Array.from(files).length) {
      alert('Some files were skipped. Please upload only image files.')
    }
    newFiles.forEach((file) => {
      bookingStore.addSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        bookingStore.addPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  }
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeImage = (index: number) => {
  bookingStore.removePreviewUrl(index)
  bookingStore.removeSelectedFile(index)
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-5">
    <button
      @click="goBack"
      class="mb-4 px-4 py-2 bg-main rounded-lg hover:bg-gray-300 transition text-white"
      v-if="step > 1 && step !== 8"
    >
      Back
    </button>

    <div v-if="step === 1">
      <h2 class="text-2xl font-bold mb-4">Select Service</h2>
      <div
        v-for="service in services"
        :key="service.id"
        class="p-4 mb-3 border border-[#00B4D8] cursor-pointer rounded-lg hover:bg-gray-100 transition"
        @click="selectService(service)"
      >
        {{ service.title }}
      </div>
    </div>

    <div v-if="step === 2">
      <h2 class="text-2xl font-bold mb-4">Select Category</h2>
      <div
        v-for="category in selectedService?.categories"
        :key="category.id"
        class="p-4 mb-3 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100 transition"
        @click="selectCategory(category)"
      >
        {{ category.title }}
      </div>
    </div>

    <div v-if="step === 3">
      <h2 class="text-2xl font-bold mb-4">Select Subcategory</h2>
      <div
        v-for="sub in selectedCategory?.subCategories"
        :key="sub.id"
        class="p-4 mb-3 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100 transition"
        @click="selectSubCategory(sub)"
      >
        <div class="font-medium">{{ sub.title }}</div>
        <div class="text-sm text-gray-600 mt-1">{{ sub.description }}</div>
      </div>
    </div>

    <div v-if="step === 4">
      <h2 class="text-2xl font-bold mb-4">Summary</h2>
      <div class="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div class="font-medium">{{ selectedService?.title }}</div>
        <div class="text-gray-700">{{ selectedCategory?.title }}</div>
        <div class="text-gray-600">{{ selectedSubCategory?.title }}</div>
        <div class="text-sm text-gray-500 mt-2">{{ selectedSubCategory?.description }}</div>
      </div>
      <button
        @click="proceed"
        class="mb-4 mt-10 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      >
        Next
      </button>
    </div>

    <div v-if="step === 5">
      <div class="flex flex-col gap-10">
        <div class="text-3xl font-sans font-bold">Additional details (optional)</div>
        <textarea
          class="w-[100%] h-[300px] border-2 border-[#EAEAEA] pt-[20px] p-[20px] resize-none hover:border-gray-500 rounded-2xl"
          v-model="details"
        />
        <div class="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            ref="fileInput"
            multiple
            class="hidden"
          />
          <button
            @click="fileInput?.click()"
            class="px-6 py-3 bg-white border-2 border-[#00B4D8] text-[#00B4D8] rounded-xl hover:bg-[#00B4D8] hover:text-white transition flex items-center justify-center gap-2"
          >
            Upload Images
          </button>
          <div class="flex flex-wrap gap-4">
            <div v-for="(url, index) in previewUrls" :key="index" class="relative w-32 h-32">
              <img :src="url" class="w-full h-full object-cover rounded-lg" />
              <button
                @click="removeImage(index)"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="proceed"
        class="mb-4 mt-10 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      >
        Next
      </button>
    </div>

    <div v-if="step === 6">
      <div class="flex flex-col gap-10 relative">
        <div class="text-3xl font-sans font-bold">Add your contact details</div>
        <div class="relative">
          <input
            v-model="firstName"
            placeholder="First Name*"
            class="w-full border-2 border-[#EAEAEA] p-[20px] rounded-2xl"
          />
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
            errors.firstName
          }}</span>
        </div>
        <div class="relative">
          <InputContent placeholder="Second name*" type="text" v-model="lastName" />
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
            errors.lastName
          }}</span>
        </div>
        <div class="relative">
          <InputContent placeholder="Phone number*" type="tel" v-model="phoneNumber" />
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
            errors.phone
          }}</span>
        </div>
        <div class="relative">
          <InputContent placeholder="E-mail address*" type="email" v-model="email" />
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
            errors.email
          }}</span>
        </div>
        <div class="text-2xl font-sans font-bold">
          Please add the address where you want the service to take place.
        </div>
        <div class="relative">
          <InputContent placeholder="Street address*" type="text" v-model="street" />
        </div>
        <div class="relative">
          <InputContent placeholder="Unit/apartment/suite*" type="text" v-model="house" />
        </div>
        <div class="relative">
          <InputContent placeholder="City*" type="text" v-model="city" />
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{ errors.city }}</span>
        </div>
        <div class="relative">
          <InputContent placeholder="Zip code*" type="text" v-model="zip" />
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{ errors.zip }}</span>
        </div>
        <InputContent
          placeholder="country*"
          name="country"
          v-model="country"
          type="disabled"
          readonly
          class="text-gray-500"
        />
        <div class="relative">
          <select v-model="state" class="w-full border-2 border-[#EAEAEA] pt-5 p-5 rounded-2xl">
            <option disabled value="">State*</option>
            <option value="Los Gatos">Los Gatos</option>
            <option value="San Jose">San Jose</option>
            <option value="Cupertino">Cupertino</option>
            <option value="Mountain View">Mountain View</option>
            <option value="Campbell">Campbell</option>
            <option value="Los Altos">Los Altos</option>
            <option value="Palo Alto">Palo Alto</option>
          </select>
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
            errors.state
          }}</span>
        </div>
        <div class="flex gap-3 items-center relative">
          <input
            type="checkbox"
            v-model="checkBox"
            class="border-[#EAEAEA] w-[24px] h-[24px] flex-shrink-0 mt-0.5"
          />
          <div class="text-gray-500 font-sans text-left">
            By checking this box, I consent to receive marketing and promotional text messages from
            FixCrew LLC at the phone number I have provided above. Message and data rates may apply.
            Message frequency varies. Reply HELP for help and STOP to stop. I consent to the
            <a
              href="https://client.housecallpro.com/marketing/terms"
              class="text-blue-600 underline whitespace-nowrap"
              >Terms of Service</a
            >
            and
            <router-link
              :to="{ name: 'PrivacyPolicy' }"
              class="text-blue-600 underline whitespace-nowrap"
              >Privacy Policy</router-link
            >
          </div>
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-8">{{
            errors.checkBox
          }}</span>
        </div>
      </div>
      <button
        @click="proceed"
        class="mb-4 mt-10 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      >
        Next
      </button>
    </div>

    <div v-if="step === 7">
      <h2 class="text-2xl font-bold mb-4">Preferred Date & Time (optional)</h2>
      <p class="text-gray-600 mb-4">You can skip this step and order immediately.</p>
      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Preferred date</label>
          <input
            type="date"
            v-model="preferredDate"
            :min="new Date().toISOString().split('T')[0]"
            class="w-full border-2 border-gray-200 rounded-lg p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Preferred time</label>
          <input
            type="time"
            v-model="preferredTime"
            class="w-full border-2 border-gray-200 rounded-lg p-2"
          />
        </div>
      </div>
      <div v-if="submitError" class="text-red-500 mt-2">{{ submitError }}</div>
      <div class="flex gap-4 mt-6">
        <button
          @click="submitWithoutPreferredTime"
          :disabled="isSubmitting"
          class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
        >
          Skip & Order
        </button>
        <button
          @click="submitWithPreferredTime"
          :disabled="isSubmitting"
          class="px-6 py-2 bg-[#00B4D8] text-white rounded-lg hover:bg-[#0099b8] transition disabled:opacity-50"
        >
          {{ isSubmitting ? 'Processing...' : 'Order with Selected Time' }}
        </button>
      </div>
    </div>

    <div v-if="step === 8" class="text-center py-10">
      <div class="text-2xl font-bold text-green-600 mb-4">
        Your order successfully delivered to operator
      </div>
      <p class="text-gray-600 mb-6">We will contact you shortly to confirm the appointment.</p>
      <button
        @click="goHome"
        class="px-6 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      >
        Back to Main Page
      </button>
    </div>
  </div>
</template>
