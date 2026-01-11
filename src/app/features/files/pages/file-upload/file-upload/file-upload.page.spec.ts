import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadPage } from './file-upload.page';

describe('FileUploadPage', () => {
  let component: FileUploadPage;
  let fixture: ComponentFixture<FileUploadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
