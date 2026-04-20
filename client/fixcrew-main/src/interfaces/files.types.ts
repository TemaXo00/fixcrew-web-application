export enum FileVisibilityEnum {
  public = 'PUBLIC',
  private = 'PRIVATE',
}

export interface UploadFile {
  file: File
  bucket: string
  visibility: FileVisibilityEnum
}

export interface FileResponse {
  id: string
}
