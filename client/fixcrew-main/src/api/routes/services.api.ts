import { internalApi } from '@/api/instances.api.ts'
import type { ServiceInterface } from '@/interfaces/service.interface.ts'

export const servicesApi = {
  async getServiceBySlug(slug: string | string[] | undefined): Promise<ServiceInterface> {
    const { data } = await internalApi.get<ServiceInterface>(`/info/services/${slug}`)
    return data
  },
}
