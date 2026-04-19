import type {
  ServiceCreateType,
  ServiceResponseType,
  ServiceUpdateCategoryType,
  ServiceUpdateCoverType,
  ServiceUpdateDescriptionType,
  ServiceUpdateNameType,
  ServiceUpdatePriceType,
  ServiceUpdateSalePercentType,
} from '@/types/info/services.types'
import type { PaginatedResponse, PaginationParams } from '@/types/shared/pagination.types'
import api from '@/api/configs.api.ts'

export const servicesApi = {
  async getServices(params: PaginationParams): Promise<PaginatedResponse<ServiceResponseType>> {
    const { data } = await api.get<PaginatedResponse<ServiceResponseType>>('/info/services', {
      params,
    })
    return data
  },

  async createService(service: ServiceCreateType): Promise<ServiceResponseType> {
    const { data } = await api.post<ServiceResponseType>('/info/services', service)
    return data
  },

  async updatePrice(id: string, dto: ServiceUpdatePriceType): Promise<ServiceResponseType> {
    const { data } = await api.patch<ServiceResponseType>(`/info/services/${id}/price`, dto)
    return data
  },

  async updateName(id: string, dto: ServiceUpdateNameType): Promise<ServiceResponseType> {
    const { data } = await api.patch<ServiceResponseType>(`/info/services/${id}/name`, dto)
    return data
  },

  async updateDescription(
    id: string,
    dto: ServiceUpdateDescriptionType,
  ): Promise<ServiceResponseType> {
    const { data } = await api.patch<ServiceResponseType>(`/info/services/${id}/description`, dto)
    return data
  },

  async updateSalePercent(
    id: string,
    dto: ServiceUpdateSalePercentType,
  ): Promise<ServiceResponseType> {
    const { data } = await api.patch<ServiceResponseType>(`/info/services/${id}/sale-percent`, dto)
    return data
  },

  async updateCategory(id: string, dto: ServiceUpdateCategoryType): Promise<ServiceResponseType> {
    const { data } = await api.patch<ServiceResponseType>(`/info/services/${id}/category`, dto)
    return data
  },

  async updateCover(id: string, dto: ServiceUpdateCoverType): Promise<ServiceResponseType> {
    const { data } = await api.patch<ServiceResponseType>(`/info/services/${id}/cover`, dto)
    return data
  },

  async toggleActive(id: string): Promise<ServiceResponseType> {
    const { data } = await api.patch<ServiceResponseType>(`/info/services/${id}/toggle`)
    return data
  },

  async deleteService(id: string): Promise<ServiceResponseType> {
    const { data } = await api.delete<ServiceResponseType>(`/info/services/${id}`)
    return data
  },
}
