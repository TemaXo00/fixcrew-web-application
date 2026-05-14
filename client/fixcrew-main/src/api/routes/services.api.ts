import { internalApi } from '@/api/instances.api.ts'
import type { ServiceInterface } from '@/interfaces/service.interface.ts'
import type { TypesDetailedInterface, TypesInterface } from '@/interfaces/types.interface.ts'
import type { CategoryInterface } from '@/interfaces/category.interface.ts'

export const servicesApi = {
  async getServiceBySlug(slug: string | string[] | undefined): Promise<ServiceInterface> {
    const { data } = await internalApi.get<ServiceInterface>(`/info/services/${slug}`)
    return data
  },

  async getTypeList(): Promise<TypesInterface[]> {
    const { data } = await internalApi.get<TypesInterface[]>('/info/types')
    return data
  },

  async getTypeById(id: string | string[] | undefined): Promise<TypesDetailedInterface> {
    const { data } = await internalApi.get<TypesDetailedInterface>(`/info/types/${id}`)
    return data
  },

  async getCategoryById(id: string | string[] | undefined): Promise<CategoryInterface> {
    const { data } = await internalApi.get<CategoryInterface>(`/info/categories/${id}`)
    return data
  }
}
