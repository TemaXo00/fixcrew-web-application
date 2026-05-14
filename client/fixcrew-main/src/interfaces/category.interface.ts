import type { TypesInterface } from '@/interfaces/types.interface.ts'
import type { ServiceInterface } from '@/interfaces/service.interface.ts'

export interface CategoryInterface {
  id: string
  name: string
  type_id?: string
  type: TypesInterface
  services: ServiceInterface[]
}
