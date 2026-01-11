import { Component, inject, signal } from '@angular/core';
import { FileUploadService, UploadResult } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: 'file-upload.page.html',
  standalone: true,
})
export class FileUploadPage {
  private readonly fileUploadService = inject(FileUploadService);

  uploading = signal(false);
  progress = signal(0);
  uploadedFile = signal<UploadResult | null>(null);
  error = signal<string | null>(null);
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedFile = file;
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    this.uploading.set(true);
    this.progress.set(0);
    this.error.set(null);
    this.uploadedFile.set(null);

    // @ts-ignore
    this.fileUploadService.uploadWithProgress(file).subscribe({
      next: (result) => {
        if (typeof result === 'number') {
          // Progress update
          this.progress.set(result);
        } else {
          // Upload complete
          this.uploadedFile.set(result);
          this.uploading.set(false);
        }
      },
      error: (err) => {
        this.error.set(err.message);
        this.uploading.set(false);
      },
    });
  }

  retry() {
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile);
    }
  }
}
