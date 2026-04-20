import type {
  CategoryCreateType,
  CategoryResponseType,
  CategoryUpdateNameType,
  CategoryUpdateTypeType,
} from '@/types/info/categories.types'
import api from '@/api/configs.api.ts'

export const categoriesApi = {
  async getCategories(typeId?: string): Promise<CategoryResponseType[]> {
    const params = typeId ? { type_id: typeId } : {}
    const { data } = await api.get<CategoryResponseType[]>('/info/categories', { params })
    return data
  },

  async createCategory(category: CategoryCreateType): Promise<CategoryResponseType> {
    const { data } = await api.post<CategoryResponseType>('/info/categories', category)
    return data
  },

  async updateCategoryType(id: string, dto: CategoryUpdateTypeType): Promise<CategoryResponseType> {
    const { data } = await api.put<CategoryResponseType>(`/info/categories/${id}/type`, dto)
    return data
  },

  async updateCategoryName(id: string, dto: CategoryUpdateNameType): Promise<CategoryResponseType> {
    const { data } = await api.patch<CategoryResponseType>(`/info/categories/${id}/name`, dto)
    return data
  },

  async deleteCategory(id: string): Promise<CategoryResponseType> {
    const { data } = await api.delete<CategoryResponseType>(`/info/categories/${id}`)
    return data
  },
}
