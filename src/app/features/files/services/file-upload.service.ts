import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private http = inject(HttpClient);
  private uploadUrl = 'https://api.example.com/upload';

  /**
   * Upload file with progress tracking
   * Returns Observable<number> representing upload progress (0-100)
   */
  uploadWithProgress(file: File): Observable<number | UploadResult> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post<UploadResult>(this.uploadUrl, formData, {
        reportProgress: true,  // Enable progress events
        observe: 'events',     // Observe all HTTP events
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              // Calculate percentage
              const percentDone = event.total
                ? Math.round((100 * event.loaded) / event.total)
                : 0;
              return percentDone;

            case HttpEventType.Response:
              // Upload complete - return result
              return event.body as UploadResult;

            default:
              return 0;
          }
        })
      );
  }

  /**
   * Simple upload without progress
   */
  upload(file: File): Observable<UploadResult> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<UploadResult>(this.uploadUrl, formData);
  }

  /**
   * Upload multiple files
   */
  uploadMultiple(files: File[]): Observable<UploadResult[]> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file, file.name);
    });

    return this.http.post<UploadResult[]>(this.uploadUrl, formData);
  }
}
