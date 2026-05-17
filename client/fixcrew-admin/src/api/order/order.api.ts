import type { OrderCalendar } from '@/types/order/order.types.ts'
import type { PaginatedResponse } from '@/types/shared/pagination.types.ts'
import api from '@/api/configs.api.ts'

export const orderApi = {
  async getPendingOrders(id: string | undefined): Promise<PaginatedResponse<OrderCalendar>> {
    if (!id) {
      throw new Error('id is required')
    }
    const { data } = await api.get<PaginatedResponse<OrderCalendar>>(
      `/order/orders/master/${id}/pending`,
    )
    return data
  },
}
