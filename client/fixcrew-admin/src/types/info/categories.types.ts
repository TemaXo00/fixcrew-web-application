import type { TypeResponseType } from './types.types'

export interface CategoryResponseType {
  id: string
  name: string
  type_id: string
  type?: TypeResponseType
}

export type CategoryCreateType = Pick<CategoryResponseType, 'name' | 'type_id'>

export type CategoryUpdateNameType = Pick<CategoryResponseType, 'name'>

export type CategoryUpdateTypeType = Pick<CategoryResponseType, 'type_id'>
