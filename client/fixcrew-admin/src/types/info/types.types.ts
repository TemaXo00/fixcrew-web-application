import type { CategoryResponseType } from '@/types/info/categories.types.ts'

export interface TypeResponseType {
  id: string
  name: string
  categories?: CategoryResponseType[]
}

export type TypeCreateType = Pick<TypeResponseType, 'name'>

export type TypeUpdateType = Pick<TypeResponseType, 'name'>
