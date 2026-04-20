import { defineStore } from 'pinia'
import type { Types, TypesCategories, TypesSubCategories } from '@/interfaces/booking.interface.ts'
import { ref, watch } from 'vue'

const STORAGE_KEYS = {
  STEP: 'booking_step',
  TYPE: 'booking_type',
  CATEGORY: 'booking_category',
  SUB_CATEGORY: 'booking_sub_category',
  DETAILS: 'booking_details',
  PREVIEW_URLS: 'booking_preview_urls',
  SELECTED_FILES: 'booking_selected_files',
  FIRST_NAME: 'booking_first_name',
  LAST_NAME: 'booking_last_name',
  PHONE_NUMBER: 'booking_phone_number',
  EMAIL: 'booking_email',
  STREET: 'booking_street',
  HOUSE: 'booking_house',
  CITY: 'booking_city',
  ZIP: 'booking_zip',
  COUNTRY: 'booking_country',
  STATE: 'booking_state',
  CHECK_BOX: 'booking_check_box',
  MARKETING_CONSENT: 'marketingConsent',
}

const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key)
    if (stored === null) return defaultValue
    if (key === STORAGE_KEYS.SELECTED_FILES) return defaultValue
    return JSON.parse(stored) as T
  } catch {
    return defaultValue
  }
}

const saveToStorage = <T>(key: string, value: T): void => {
  try {
    if (key === STORAGE_KEYS.SELECTED_FILES) return
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export const useBookingStore = defineStore('booking', () => {
  const step = ref(loadFromStorage(STORAGE_KEYS.STEP, 1))
  const type = ref(loadFromStorage<Types | null>(STORAGE_KEYS.TYPE, null))
  const category = ref(loadFromStorage<TypesCategories | null>(STORAGE_KEYS.CATEGORY, null))
  const subCategory = ref(
    loadFromStorage<TypesSubCategories | null>(STORAGE_KEYS.SUB_CATEGORY, null),
  )

  const details = ref(loadFromStorage(STORAGE_KEYS.DETAILS, ''))
  const previewUrls = ref(loadFromStorage<string[]>(STORAGE_KEYS.PREVIEW_URLS, []))
  const selectedFiles = ref<File[]>([])

  const firstName = ref(loadFromStorage(STORAGE_KEYS.FIRST_NAME, ''))
  const lastName = ref(loadFromStorage(STORAGE_KEYS.LAST_NAME, ''))
  const phoneNumber = ref(loadFromStorage(STORAGE_KEYS.PHONE_NUMBER, ''))
  const email = ref(loadFromStorage(STORAGE_KEYS.EMAIL, ''))
  const street = ref(loadFromStorage(STORAGE_KEYS.STREET, ''))
  const house = ref(loadFromStorage(STORAGE_KEYS.HOUSE, ''))
  const city = ref(loadFromStorage(STORAGE_KEYS.CITY, ''))
  const zip = ref(loadFromStorage(STORAGE_KEYS.ZIP, ''))
  const country = ref(loadFromStorage(STORAGE_KEYS.COUNTRY, 'United States'))
  const state = ref(loadFromStorage(STORAGE_KEYS.STATE, ''))
  const checkBox = ref(loadFromStorage(STORAGE_KEYS.CHECK_BOX, false))

  const setStep = (v: number) => (step.value = v)
  const setType = (v: Types | null) => {
    type.value = v
    if (!v) {
      category.value = null
      subCategory.value = null
    }
  }

  const setCategory = (v: TypesCategories | null) => {
    category.value = v
    if (!v) subCategory.value = null
  }

  const setSubCategory = (v: TypesSubCategories | null) => (subCategory.value = v)
  const setDetails = (v: string) => (details.value = v)

  const addPreviewUrl = (url: string) => previewUrls.value.push(url)
  const removePreviewUrl = (i: number) => previewUrls.value.splice(i, 1)
  const clearPreviewUrls = () => (previewUrls.value = [])

  const addSelectedFile = (f: File) => selectedFiles.value.push(f)
  const removeSelectedFile = (i: number) => selectedFiles.value.splice(i, 1)
  const clearSelectedFiles = () => (selectedFiles.value = [])

  const setFirstName = (v: string) => (firstName.value = v)
  const setLastName = (v: string) => (lastName.value = v)
  const setPhoneNumber = (v: string) => (phoneNumber.value = v)
  const setEmail = (v: string) => (email.value = v)
  const setStreet = (v: string) => (street.value = v)
  const setHouse = (v: string) => (house.value = v)
  const setCity = (v: string) => (city.value = v)
  const setZip = (v: string) => (zip.value = v)
  const setCountry = (v: string) => (country.value = v)
  const setState = (v: string) => (state.value = v)
  const setCheckBox = (v: boolean) => (checkBox.value = v)

  const resetStore = () => {
    step.value = 1
    type.value = null
    category.value = null
    subCategory.value = null
    details.value = ''
    previewUrls.value = []
    selectedFiles.value = []
    firstName.value = ''
    lastName.value = ''
    phoneNumber.value = ''
    email.value = ''
    street.value = ''
    house.value = ''
    city.value = ''
    zip.value = ''
    country.value = 'United States'
    state.value = ''
    checkBox.value = false
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k))
  }

  watch(step, (v) => saveToStorage(STORAGE_KEYS.STEP, v))
  watch(type, (v) => saveToStorage(STORAGE_KEYS.TYPE, v))
  watch(category, (v) => saveToStorage(STORAGE_KEYS.CATEGORY, v))
  watch(subCategory, (v) => saveToStorage(STORAGE_KEYS.SUB_CATEGORY, v))
  watch(details, (v) => saveToStorage(STORAGE_KEYS.DETAILS, v))
  watch(previewUrls, (v) => saveToStorage(STORAGE_KEYS.PREVIEW_URLS, v), { deep: true })
  watch(firstName, (v) => saveToStorage(STORAGE_KEYS.FIRST_NAME, v))
  watch(lastName, (v) => saveToStorage(STORAGE_KEYS.LAST_NAME, v))
  watch(phoneNumber, (v) => saveToStorage(STORAGE_KEYS.PHONE_NUMBER, v))
  watch(email, (v) => saveToStorage(STORAGE_KEYS.EMAIL, v))
  watch(street, (v) => saveToStorage(STORAGE_KEYS.STREET, v))
  watch(house, (v) => saveToStorage(STORAGE_KEYS.HOUSE, v))
  watch(city, (v) => saveToStorage(STORAGE_KEYS.CITY, v))
  watch(zip, (v) => saveToStorage(STORAGE_KEYS.ZIP, v))
  watch(country, (v) => saveToStorage(STORAGE_KEYS.COUNTRY, v))
  watch(state, (v) => saveToStorage(STORAGE_KEYS.STATE, v))
  watch(checkBox, (v) => {
    saveToStorage(STORAGE_KEYS.CHECK_BOX, v)
    localStorage.setItem(STORAGE_KEYS.MARKETING_CONSENT, String(v))
  })

  return {
    step,
    type,
    category,
    subCategory,
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
    setStep,
    setType,
    setCategory,
    setSubCategory,
    setDetails,
    addPreviewUrl,
    removePreviewUrl,
    clearPreviewUrls,
    addSelectedFile,
    removeSelectedFile,
    clearSelectedFiles,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setEmail,
    setStreet,
    setHouse,
    setCity,
    setZip,
    setCountry,
    setState,
    setCheckBox,
    resetStore,
  }
})
