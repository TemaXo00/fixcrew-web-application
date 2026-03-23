<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Types, TypesCategories, TypesSubCategories } from '@/interfaces/booking.interface.ts'
import { services } from '@/mocks/booking.mock.ts'
import InputContent from '@/components/universalComp/InputContent.vue'

const step = ref(1)
const selectedService = ref<Types | null>(null)
const selectedCategory = ref<TypesCategories | null>(null)
const selectedSubCategory = ref<TypesSubCategories | null>(null)

const previewUrls = ref<string[]>([])
const selectedFiles = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const firstName = ref<string>('')
const lastName = ref<string>('')
const phoneNumber = ref<string>('')
const email = ref<string>('')
const street = ref<string>('')
const house = ref<string>('')
const city = ref<string>('')
const zip = ref<string>('')
const country = ref<string>('United States')
const state = ref<string>('')
const checkBox = ref<boolean>(false)

const details = ref<string>('')

const errors = ref<Record<string, string>>({})

onMounted(() => {
  const saved = localStorage.getItem('marketingConsent')
  if (saved === 'true') checkBox.value = true
})

watch(checkBox, (val) => {
  localStorage.setItem('marketingConsent', String(val))
})

const validateStep6 = () => {
  const newErrors: Record<string, string> = {}

  if (!firstName.value.trim()) newErrors.firstName = 'Required'
  if (!lastName.value.trim()) newErrors.lastName = 'Required'
  if (!phoneNumber.value.trim()) newErrors.phone = 'Required'
  if (!email.value.trim()) newErrors.email = 'Required'
  if (!street.value.trim()) newErrors.street = 'Required'
  if (!house.value.trim()) newErrors.house = 'Required'
  if (!city.value.trim()) newErrors.city = 'Required'
  if (!zip.value.trim()) newErrors.zip = 'Required'
  if (!state.value.trim()) newErrors.state = 'Required'
  if (!checkBox.value) newErrors.checkBox = 'Required'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email.value && !emailRegex.test(email.value)) {
    newErrors.email = 'Invalid email'
  }

  const phoneRegex =
    /^[\+]?1?[\s\-]?\(?([2-9][0-8][0-9])\)?[\s\-]?([2-9][0-9]{2})[\s\-]?([0-9]{4})$/

  if (phoneNumber.value && !phoneRegex.test(phoneNumber.value)) {
    newErrors.phone = 'Invalid phone number. Example: +1 123-456-7890'
  }

  const streetRegex =
    /^\d+\s+(?:[A-Za-z]+\.?\s+)?[A-Za-z\s]+(?:Street|St|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Lane|Ln|Road|Rd|Court|Ct|Circle|Cir|Way|Place|Pl|Terrace|Ter|Parkway|Pkwy|Highway|Hwy)(?:\s+(?:[NSEW]|North|South|East|West))?(?:,\s*|$|[\s#]+(?:Apt|Suite|Ste|Unit|#)\s*\w+)?$/i
  if (street.value && !streetRegex.test(street.value)) {
    newErrors.street = 'Invalid street address. Example: 123 Sunset Boulevard'
  }

  const houseRegex = /^(Apt|Unit|Suite|#)?\s*[a-zA-Z0-9][a-zA-Z0-9\s\-]*[a-zA-Z0-9]$/i
  if (house.value) {
    const trimmed = house.value.trim()
    if (!houseRegex.test(trimmed)) {
      newErrors.house = 'Invalid house address. Example: Apt 123, Unit 4B, or Suite 200'
    } else if (trimmed.length > 100) {
      newErrors.house = 'House address is too long (maximum 100 characters)'
    }
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
  step.value++
}

const goBack = () => {
  if (step.value >= 0) step.value--
}

const selectService = (service: Types) => {
  selectedService.value = service
  proceed()
}

const selectCategory = (category: TypesCategories) => {
  selectedCategory.value = category
  proceed()
}

const selectSubCategory = (sub: TypesSubCategories) => {
  selectedSubCategory.value = sub
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
      selectedFiles.value.push(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        previewUrls.value.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeImage = (index: number) => {
  previewUrls.value.splice(index, 1)
  selectedFiles.value.splice(index, 1)
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-5">
    <button
      @click="goBack"
      class="mb-4 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      v-if="step > 1"
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
          <InputContent placeholder="Phone number*" type="phone" v-model="phoneNumber" />
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
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
            errors.street
          }}</span>
        </div>

        <div class="relative">
          <InputContent placeholder="Unit/apartment/suite*" type="text" v-model="house" />
          <span class="absolute text-red-500 text-xs bottom-[-18px] left-2">{{
            errors.house
          }}</span>
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
              class="text-blue-600 underline"
              >Terms of Service</a
            >
            and
            <a
              href="https://client.housecallpro.com/marketing/privacy"
              class="text-blue-600 underline"
              >Privacy Policy</a
            >.
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
        Submit
      </button>
    </div>
  </div>
</template>
