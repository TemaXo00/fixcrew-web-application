import type { TypeCreateType, TypeResponseType, TypeUpdateType } from '@/types/info/types.types'
import api from '@/api/configs.api.ts'

export const typesApi = {
  async getTypes(): Promise<TypeResponseType[]> {
    const { data } = await api.get<TypeResponseType[]>('/info/types')
    return data
  },

  async getTypeById(id: string): Promise<TypeResponseType> {
    const { data } = await api.get<TypeResponseType>(`/info/types/${id}`)
    return data
  },

  async createType(type: TypeCreateType): Promise<TypeResponseType> {
    const { data } = await api.post<TypeResponseType>('/info/types', type)
    return data
  },

  async updateType(id: string, dto: TypeUpdateType): Promise<TypeResponseType> {
    const { data } = await api.put<TypeResponseType>(`/info/types/${id}`, dto)
    return data
  },

  async deleteType(id: string): Promise<TypeResponseType> {
    const { data } = await api.delete<TypeResponseType>(`/info/types/${id}`)
    return data
  },
}
