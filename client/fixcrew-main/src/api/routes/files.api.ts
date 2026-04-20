import type { FileResponse, UploadFile } from '@/interfaces/files.types'
import { internalApi } from '@/api/instances.api.ts'


export const filesApi = {
  async upload(dto: UploadFile): Promise<FileResponse> {
    const formData = new FormData()
    formData.append('file', dto.file)
    formData.append('bucket', dto.bucket)
    formData.append('visibility', dto.visibility)
    const { data } = await internalApi.post<FileResponse>('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  async getPublicFile(id: string): Promise<Blob> {
    const { data } = await internalApi.get<Blob>(`/file/public/${id}`, {
      responseType: 'blob',
    })
    return data
  },

  async getPrivateFile(id: string): Promise<Blob> {
    const { data } = await internalApi.get<Blob>(`/file/private/${id}`, {
      responseType: 'blob',
    })
    return data
  },

  async deleteFile(id: string): Promise<{ success: boolean }> {
    const { data } = await internalApi.delete<{ success: boolean }>(`/file/${id}`)
    return data
  },
}
