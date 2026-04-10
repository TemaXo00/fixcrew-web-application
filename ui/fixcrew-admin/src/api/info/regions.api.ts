import type { RegionResponseType } from '@/types/regions.types.ts'
import api from '@/api/configs.api.ts'

export const regionsApi = {
  async getRegions(): Promise<RegionResponseType[]> {
    const { data } = await api.get<RegionResponseType[]>('/info/regions')
    return data
  },
}
