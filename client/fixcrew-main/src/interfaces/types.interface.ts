import type { CategoryInterface } from '@/interfaces/category.interface.ts'

export interface TypesInterface {
  id: string
  name: string
}

export interface TypesDetailedInterface {
  id: string
  name: string
  categories: CategoryInterface[]
}
