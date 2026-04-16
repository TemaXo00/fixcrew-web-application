import type {
  RegionCreateType,
  RegionResponseType,
  RegionUpdateType,
} from '@/types/info/regions.types.ts'
import api from '@/api/configs.api.ts'

export const regionsApi = {
  async getRegions(): Promise<RegionResponseType[]> {
    const { data } = await api.get<RegionResponseType[]>('/info/regions')
    return data
  },

  async createRegion(region: RegionCreateType): Promise<RegionResponseType> {
    const { data } = await api.post<RegionResponseType>('/info/regions', region)
    return data
  },

  async updateRegion(id: string, dto: RegionUpdateType): Promise<RegionResponseType> {
    const { data } = await api.patch<RegionResponseType>(`/info/regions/${id}`, dto)
    return data
  },

  async deleteRegion(id: string): Promise<RegionResponseType> {
    const { data } = await api.delete<RegionResponseType>(`/info/regions/${id}`)
    return data
  },
}
