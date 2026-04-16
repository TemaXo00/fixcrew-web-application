import type { CategoryResponseType } from './categories.types'

export interface ServiceResponseType {
  id: string
  name: string
  description: string
  price: number
  sale_percent: number
  avg_time: number | null
  is_active: boolean
  category_id: string
  category?: CategoryResponseType
}

export type ServiceCreateType = Pick<
  ServiceResponseType,
  'name' | 'description' | 'price' | 'category_id'
> & {
  sale_percent?: number
  avg_time?: number
  is_active?: boolean
}

export type ServiceUpdatePriceType = Pick<ServiceResponseType, 'price'>
export type ServiceUpdateNameType = Pick<ServiceResponseType, 'name'>
export type ServiceUpdateDescriptionType = Pick<ServiceResponseType, 'description'>
export type ServiceUpdateSalePercentType = Pick<ServiceResponseType, 'sale_percent'>
export type ServiceUpdateCategoryType = Pick<ServiceResponseType, 'category_id'>
