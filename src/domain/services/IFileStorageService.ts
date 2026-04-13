export interface UploadResult {
  url: string;
  key: string;
  size: number;
}

export interface IFileStorageService {
  upload(file: Buffer, key: string, contentType: string): Promise<UploadResult>;
  delete(key: string): Promise<void>;
}
