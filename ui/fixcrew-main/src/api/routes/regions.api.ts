import { internalApi } from '@/api/instances.api.ts'
import type { RegionInterface } from '@/interfaces/regions.interface.ts'

export const regionsApi = {
  async getRegions(): Promise<RegionInterface[]> {
    const { data } = await internalApi.get('/info/regions')
    return data
  }
}
