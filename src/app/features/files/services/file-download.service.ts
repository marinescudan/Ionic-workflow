import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FileDownloadService {
  private readonly http = inject(HttpClient);

  /**
   * Download file with progress tracking
   */
  downloadWithProgress(url: string): Observable<number | Blob> {
    return this.http
      .get(url, {
        responseType: 'blob',  // Important: receive as Blob
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.DownloadProgress:
              const percentDone = event.total
                ? Math.round((100 * event.loaded) / event.total)
                : 0;
              return percentDone;

            case HttpEventType.Response:
              return event.body as Blob;

            default:
              return 0;
          }
        })
      );
  }

  /**
   * Download and save file
   */
  download(url: string, filename: string): void {
    this.downloadWithProgress(url).subscribe({
      next: (result) => {
        if (result instanceof Blob) {
          // Create download link and trigger
          const blob = result;
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = filename;
          link.click();
          window.URL.revokeObjectURL(downloadUrl);
        }
      },
      error: (err) => {
        console.error('Download failed:', err);
      },
    });
  }
}
